export class FabricSupplier {
    itemCode!: number;
    reference!: string;
    supplier!: string;
  }

  export class TypeDefect {
    id!: string;
    description!: string;
  }


  export class FabricReport {
    id!: string;
    creationDate: any;
    fabricSupplier!: FabricSupplier;
    quantityAffected!: number;
    typeDefect!: TypeDefect;
    batchNum!: string;
    imagesUrl!: string[];
    comment!: string;
  }

  export class OIBT {
    itemCode!: string;
    batchNum!: string;
    identifier!: string;
    itemName!: string;

  }





