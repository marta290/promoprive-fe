export type TipoNodoLexical = 'text' | 'paragraph' | 'root' | string;

export interface IFrammentoTesto {
  text: string;           
  format: number; 
  style: string;
  type: 'text' | string;          
  version: number;
  detail?: number;
  mode?: string;
}

export interface IParagrafo {
  type: 'paragraph' | string;     
  direction: 'ltr' | 'rtl' | string | null;
  format: string | number;
  indent: number;
  version: number;
  children: IFrammentoTesto[]; 
}

export interface IDatiLexical {
  root: {
    type: 'root' | string;     
    direction: 'ltr' | 'rtl' | string | null;
    format: string | number;
    indent: number;
    version: number;
    children: IParagrafo[]; 
  };
}

export interface ILexicalRendererProps {
  descrizioneFormattata: IDatiLexical;
}