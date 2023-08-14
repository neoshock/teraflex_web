export interface ApiResponseCategoriesI {
    statusCode: number;
    message: string;
    data: GetCategoryI[];
}

export interface GetCategoryI {
    id: 3,
    name: string;
    description: string;
    status: boolean;
    createdById: number;
    updatedById: number;
    createdAt: Date;
    updatedAt: Date;
}