import { css } from "styled-components";
import PxtoRem from "../modules/PxtoRem";
import Colors from "open-color";

class Themes {
  Color = Colors;

  Fonts = {
    family: "'Noto Sans KR', sans-serif",
    size: {
      h1: PxtoRem(45),
      h2: PxtoRem(36),
      h3: PxtoRem(25),
      h4: PxtoRem(18),
      p: PxtoRem(16),
      small: PxtoRem(12)
    },
    weight: {
      bold: 700,
      regular: 400,
      light: 300,
      thin: 100
    }
  };

  Heading = {
    h1: {
      size: this.Fonts.size.h1,
      weight: this.Fonts.weight.bold
    },
    h2: {
      size: this.Fonts.size.h2,
      weight: this.Fonts.weight.bold
    },
    h3: {
      size: this.Fonts.size.h3,
      weight: this.Fonts.weight.bold
    },
    h4: {
      size: this.Fonts.size.h4,
      weight: this.Fonts.weight.bold
    },
    paragraph: {
      size: this.Fonts.size.p,
      weight: this.Fonts.weight.regular
    },
    small: {
      size: this.Fonts.size.small,
      weight: this.Fonts.weight.regular
    }
  };
  BreakPoint = {
    xlarge: {
      min: 1920,
      max: null
    },
    large: {
      min: 1280,
      max: 1919
    },
    desktop: {
      min: 960,
      max: 1279
    },
    tablet: {
      min: 720,
      max: 959
    },
    phone: {
      min: null,
      max: 719
    }
  };
  
  Media = Object.keys(this.BreakPoint).reduce((acc, label) => {
    acc[label] = (...args) => {
      if (this.BreakPoint[label].min && this.BreakPoint[label].max) {
        return css`
          @media (min-width: ${this.BreakPoint[label].min /
              16}rem) and (max-width: ${this.BreakPoint[label].max / 16}rem) {
            ${css(...args)}
          }
        `;
      } else if (!this.BreakPoint[label].min) {
        return css`
          @media (max-width: ${this.BreakPoint[label].max / 16}rem) {
            ${css(...args)}
          }
        `;
      } else if (!this.BreakPoint[label].max) {
        return css`
          @media (min-width: ${this.BreakPoint[label].min / 16}rem) {
            ${css(...args)}
          }
        `;
      }
    };

    return acc;
  }, {});
}

export default new Themes();
