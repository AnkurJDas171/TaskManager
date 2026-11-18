import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";

import { FiltersType } from "../store/slice/filters";
import { TaskData } from "../types";

const fuzzyMatch = (data: TaskData[], searchText: string): TaskData[] => {
    const fuse = new Fuse(data, {
        keys: [ 'title' ],
        includeScore: false,
        threshold: 0.4
    });
    return fuse.search(searchText).map(result => result.item);
}

const filter = (list: TaskData[], filters: FiltersType) => {
    const newList = list.filter(item =>
        (filters.isCompleted === null || filters.isCompleted === item.isCompleted) &&
        (filters.priority === null || filters.priority === item.priority)
    );

    if(filters.searchText === '') return newList;
    return fuzzyMatch(newList, filters.searchText);
}

const useFilteredList = (listData: TaskData[], filters: FiltersType) => {
    const [filteredList, setFilteredList] = useState<TaskData[]>([]);
    useEffect(() => {
        const list = structuredClone(listData);
        setFilteredList(_ => filter(structuredClone(listData), filters))
    }, [listData, filters]);

    return filteredList;
}

export default useFilteredList;
