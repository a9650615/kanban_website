const cookie = {
  writeCookie: (key, value) => {
    const date = new Date();
    // Get unix milliseconds at current time plus number of days
    date.setTime(+date + 365 * 86400000); // 24 * 60 * 60 * 1000

    window.document.cookie = `${key}=${value}; expires=${date.toGMTString()}; path=/`;

    return value;
  },
  getCookie: key => {
    if (window) {
      const value = `; ${window.document.cookie}`;
      const parts = value.split(`; ${key} =`);
      if (parts.length === 2)
        return parts
          .pop()
          .split()
          .shift();
    }
    return null;
  },
};

export default cookie;
