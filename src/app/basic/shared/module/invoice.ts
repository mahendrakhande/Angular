export class Invoice {
    student_id:number;
    invoice_date:Date;
    branch_id: number;
    course_id:number;
    start_date: Date;
    end_date: Date;
    certificate_issue: [false];
    invoice_rest:number;
    invoice_ref1: number;
    invoice_ref2: number;
    invoice_amount: number;
    cgst: number;
    sgst: number;
    total_invoice: number;
    tds: number;
    net_amount: number;
}
