export const useClassNames = (...classes: any) => {
    return classes.filter(Boolean).join(' ');
}