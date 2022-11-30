export interface RadioCardsSmallLink {
    label: string,
    path: string
}

export interface RadioCardsSmallOptions{
    label: string,
    value: string,
    disabled: boolean
}

export interface RadioCardsSmallSettings {
    label: string,
    link?: RadioCardsLink,
    options: RadioCardsOptions[],
    default?: number,
    selected: function
}