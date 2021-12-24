import * as P from "fp-ts-routing";
import { altAll } from "fp-ts/Alternative";
import * as O from "fp-ts/Option";
import * as t from "io-ts";
import { NumberFromString } from "io-ts-types";
import * as Route from "./Route";

// Equivalent to `/` in `path-to-regexp`.
export const homeMatch: P.Match<Route.Home> = P.end;

const slugify = (s: string) => s.replace(/\s/g, "-");
const deslugify = (s: string) => s.replace(/-/g, " ");

// Equivalent to `/search/:query?page={number}` in `path-to-regexp`.
export const searchMatch: P.Match<Route.Search> = P.lit("search")
    .then(
        P.str("query").imap(
            ({ query }) => ({ query: deslugify(query) }),
            ({ query }) => ({ query: slugify(query) })
        )
    )
    .then(
        P.query(
            t.exact(
                t.partial({
                    page: NumberFromString,
                })
            )
        )
    )
    .then(P.end);

const router: P.Parser<Route.Union.Route> = altAll(P.parser)([
    homeMatch.parser.map(Route.Union.Home),
    searchMatch.parser.map(Route.Union.Search),
]);

export const parseRoute = (path: string): O.Option<Route.Union.Route> =>
    P.parse(router.map(O.some), P.Route.parse(path), O.none);
