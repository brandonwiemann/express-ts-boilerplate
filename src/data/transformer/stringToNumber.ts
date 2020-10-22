export default {
    from(value: string): number {
        if(!value) return 0;
        return Number(value);
    },
    to(value: number): string {
        if(!value) return '0';
        return value.toString();
    }
}
