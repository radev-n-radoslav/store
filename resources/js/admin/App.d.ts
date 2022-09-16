export interface Navigation {
    name: string,
    href: string,
    icon: string,
    current: boolean
}

export interface PageStaticData {
    logo: string,
    navigation: Navigation[],
    secondaryNavigation: Navigation[]
}