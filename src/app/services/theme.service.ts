import { Injectable } from '@angular/core';

type ThemeType = 'default' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  previousTheme: ThemeType = null!;
  currentTheme: ThemeType = 'default';

  private removeUnusedTheme(theme: ThemeType): void {
    document.documentElement.classList.remove(theme);
    const removedThemeStyle = document.getElementById(theme);
    if (removedThemeStyle) {
      document.head.removeChild(removedThemeStyle);
    }
  }

  loadTheme(firstLoad = true): Promise<Event> {
    const theme = this.currentTheme;
    if (firstLoad) {
      console.log('first load');
      document.documentElement.classList.add(theme);
    }
    return new Promise((resolve, reject) => {
      this.loadCSS(`${theme}.css`, theme).then(
        e => {
          if (!firstLoad) {
            document.documentElement.classList.add(theme);
          }
          this.removeUnusedTheme(this.previousTheme);
          resolve(e);
        },
        e => reject(e)
      )
    });
  }

  private loadCSS(href: string, id: string): Promise<Event> {
    return new Promise((resolve, reject) => {
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = href;
      style.id = id;
      style.onload = resolve;
      style.onerror = reject;
      document.head.append(style);
    });
  }
}
