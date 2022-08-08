interface IComparisonColumns {
  ct_image_logo_upload: string;
  ct_image_logo: string;
  ct_image_logo_alt_text: string;
  ct_image_phone_upload: string;
  ct_img_phone: string;
  ct_img_phone_alt_text: string;
  ct_cta_link: string;
  ct_cta_text: string;
}

interface IComparisonRows {
  ct_name_row: string;
  ct_col_check;
}

interface IComparisonCard {
  ct_title: string;
  ct_image_columns: IComparisonColumns[];
  ct_rows: IComparisonRows[];
}

export interface ICTProps {
  data?: IComparisonCard;
}
