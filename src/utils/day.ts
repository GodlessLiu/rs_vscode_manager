import * as dayjs from 'dayjs';


export function format_time(d: string | undefined) {
    if (d == undefined) {
        return ''
    }
    return dayjs.default().format('YYYY-MM-DD')
}