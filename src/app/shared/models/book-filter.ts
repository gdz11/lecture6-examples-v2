
type Nullable<T> = T | undefined | null;

export interface BookFilter {
    title: Nullable<string>;
    author: Nullable<string>;
}