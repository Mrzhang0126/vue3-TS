// enum FORM_ITEM_TYPE {
//   INPUT,
//   PASSWORD,
//   SELECT,
//   DATEPICKER
// }

type IFormType = 'input' | 'password' | 'select' | 'datepicker';

export interface IFormItem {
  field: string;
  type: IFormType;
  label: string;
  rules?: any[];
  placeholder?: string;
  options?: any[]; // select
  otherOptions?: any; // 其他属性
  isHidden?: boolean;
}

export interface IForm {
  formItems: IFormItem[];
  labelWidth?: string;
  colLayout?: any;
  itemStyle?: any;
}
