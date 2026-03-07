import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("articles", "routes/articles.tsx"),
    route("books", "routes/books.tsx"),
    route("resume", "routes/resume.tsx"),
    route("*", "routes/notfound.tsx"),
] satisfies RouteConfig;
