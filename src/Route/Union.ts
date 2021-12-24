import * as _ from "./index";

export type Route =
    | ({ _tag: "Home" } & _.Home)
    | ({ _tag: "Search" } & _.Search);

export const Home = (): Route => ({ _tag: "Home" });

export const Search = (value: _.Search): Route => ({
    _tag: "Search",
    ...value,
});
