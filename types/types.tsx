export type CompareContextType = {
    compare: number[];
    toggleCompare: (id: number) => void;
    resetCompare: () => void;
}

export type FavoritesContextType = {
    favorites: number[];
    toggleFavorites: (id: number) => void;
}