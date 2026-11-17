export type TaskData = {
    id: string,
    title: string,
    description: string,
    priority: 'low' | 'medium' | 'high',
    dueDate: string,
    isCompleted: boolean
}

export type Navigation = {
    navigate: (arg: string, ...params: any) => void,
    goBack: () => void,
}

export type Route = {
    params?: any
}
