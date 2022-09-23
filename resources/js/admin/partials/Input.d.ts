export interface InputSettings{
    id: string,
    type: string,
    label: string,
    name: string,
    placeholder: string,
    defaultValue: string,
    validationRules: object
    readonly: boolean
    rest?: any
}