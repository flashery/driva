export type FormFieldProps = {
    label: string;
    name: string;
    type?: 'text' | 'number' | 'email' | 'select';
    error?: string;
    register: any;
    required?: boolean;
    options?: { value: string; label: string }[];
}