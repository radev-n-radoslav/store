export interface Logo {
    url: string,
    memo: string
}

export interface Socials {
    name: string,
    href: string,
    icon: string
}

export interface NavigationLink{
    name: string,
    href: string
}

export interface Navigation {
    title: string,
    links: NavigationLink[]
}

export interface Footer {
    socials: Socials[],
    navigation: Navigation[]
}

export interface PageStaticData {
    logo: Logo,
    header: any,
    footer: Footer
}