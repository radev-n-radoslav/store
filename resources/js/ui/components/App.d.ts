export interface Logo {
    url: string,
    memo: string
}

export interface Socials {
    name: string,
    href: string,
    icon: string
}

export interface NavigationLinks{
    name: string,
    href: string
}

export interface Navigation {
    title: string,
    links: NavigationLinks
}

export interface Footer {
    socials: Socials[]
}

export interface PageStaticData {
    logo: Logo,
    header: any,
    footer: Footer
}