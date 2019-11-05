export function formatAMPM(date: Date | string) {
    const d = new Date(date);
    let hours = d.getHours();
    let minutes = d.getMinutes().toString();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = +minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
}
