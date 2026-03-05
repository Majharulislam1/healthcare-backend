
export type IOptions ={
     page?:number | string,
     limit?:number | string,
      
     sortBy?:string,
     sortOrder?:string
}

type IOptionsReturn ={
     page:number,
     limit:number,
     skip:number,
     sortBy:string,
     sortOrder:string
}


const calculatePagination = (options:IOptions):IOptionsReturn=>{
    const page:number = Number(options.page) || 1;
    const limit:number = Number(options.limit)|| 10;
    const skip:number = Number(page - 1) * limit;

     const sortBy:string = options.sortBy || 'cratedAt';
     const sortOrder:string = options.sortOrder || 'desc';

     return {
         page,
         limit,
         skip,
         sortBy,
         sortOrder
     }
}


export const paginationHelper = {
     calculatePagination
}

