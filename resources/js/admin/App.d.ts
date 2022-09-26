export interface NavigationSubPage {
    name: string,
    href: string,
    icon: string,
    current?: boolean,
}

export interface Navigation {
    name: string,
    href?: string,
    icon: string,
    current?: boolean,
    pages: NavigationSubPage[]
}

export interface PageStaticData {
    logo: string,
    navigation: Navigation[]
}