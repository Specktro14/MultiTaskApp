interface FilterController {
  getFilters?: (req: any, res: any) => Promise<void>
  createFilter?: (req: any, res: any) => Promise<void>
  getFilter?: (req: any, res: any) => Promise<void>
  updateFilter?: (req: any, res: any) => Promise<void>
  deleteFilter?: (req: any, res: any) => Promise<void>
}