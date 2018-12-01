const cookie = {
  writeCookie: (key, value) => {
    const date = new Date();
    // Get unix milliseconds at current time plus number of days
    date.setTime(+date + 365 * 86400000); // 24 * 60 * 60 * 1000

    window.document.cookie = `${key}=${value}; expires=${date.toGMTString()}; path=/`;

    return value;
  },
};

export default cookie;
