export const formatDate = dateStr => {
  let date = new Date(dateStr);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  return `${
    monthNames[date.getMonth()]
  } ${date.getDay()}, ${date.getFullYear()}`;
};

export const shadows = {
  8: '0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12)'
};

export const placeholder = (width, height) => {
  return `data:image/svg+xml;charset=UTF-8,<svg%20width%3D"${width}"%20height%3D"${height}"%20xmlns%3D"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg"%20viewBox%3D"0%200%2064%2064"%20preserveAspectRatio%3D"none"><defs><style%20type%3D"text%2Fcss">%23holder_164e854e037%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20<%2Fstyle><%2Fdefs><g%20id%3D"holder_164e854e037"><rect%20width%3D"${width}"%20height%3D"${height}"%20fill%3D"%23777"><%2Frect><g><text%20x%3D"13.84375"%20y%3D"36.65">${width}x${height}<%2Ftext><%2Fg><%2Fg><%2Fsvg>`;
};
