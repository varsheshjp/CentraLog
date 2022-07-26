export class Project {
    id: string;
    name: string;
    created: Date;
    updated: Date;
    logCount: number;
    user_Id: string;
}
export class ProjectReturn {
    status: string;
    projectDetails: Project[]
}