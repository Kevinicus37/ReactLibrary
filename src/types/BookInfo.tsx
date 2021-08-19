import { CheckedOutInfo } from "./CheckedOutInfo";

export interface BookInfo {
    checkedOutInfo : CheckedOutInfo;
    dueDate: string;
    checkedOutDate: string;
}