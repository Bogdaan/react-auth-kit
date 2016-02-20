import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'

export default {

  write(name, value, days) {
    if (!canUseDOM) return this;

    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    }

    document.cookie = name + "=" + value + expires + "; path=/";

    return this;
  },

  getRaw(name) {
    if (!canUseDOM) return '';
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  },

  getObject(name) {
    let result = this.getRaw(name);

    if (!result)
      return undefined;

    try {
      return JSON.parse(result);
    } catch (e) {
      // empty
    }

    return undefined;
  }
}
