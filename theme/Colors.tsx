interface ColorShade {
  DEFAULT: string;
  90?: string;
  75?: string;
  70?: string;
  60?: string;
  50?: string;
  20?: string;
  10?: string;
}

interface ContentColors {
  DEFAULT: string;
  75?: string;
  50?: string;
  20?: string;
}

interface BaseColors {
  100: ColorShade;
  200: string;
  300: string;
  content: ContentColors;
}

interface PrimaryColors {
  DEFAULT: string;
  60?: string;
  20?: string;
  content: ContentColors;
}

interface SecondaryColors {
  DEFAULT: string;
  10?: string;
  content: string;
}

interface StatusColors {
  warning: {
    DEFAULT: string;
    10?: string;
    20?: string;
    background: string;
    content: ContentColors;
  };
  error: {
    DEFAULT: string;
    20?: string;
  };
  success: {
    DEFAULT: string;
    background?: string;
    20?: string;
  };
}

export interface ThemeColors {
  base: BaseColors;
  primary: PrimaryColors;
  secondary: SecondaryColors;
  status: StatusColors;
  text: string;            // ✅ Added
  textSecondary: string;   // ✅ Added
  primaryBlack: string;    // ✅ Added
}

interface ColorScheme {
  dark: ThemeColors;
  light: ThemeColors;
}

const Colors: ColorScheme = {
  dark: {
    base: {
      100: {
        DEFAULT: "#282D33",
        90: "#282D33E5",
        75: "#282D33B2",
        70: "#282D33B2",
      },
      200: "#191B1F",
      300: "#0D0E0F",
      content: {
        DEFAULT: "#F0F3F7",
        75: "#F0F3F7BF",
        50: "#F0F3F780",
        20: "#F0F3F733",
      },
    },
    primary: {
      DEFAULT: "#5E93E8",
      60: "#5E93E899",
      20: "#5E93E833",
      content: {
        DEFAULT: "#F0F3F7",
        20: "#F0F3F733",
        50: "#F0F3F780",
      },
    },
    secondary: {
      DEFAULT: "#2E5799",
      10: "#2E57991A",
      content: "#F0F3F7",
    },
    status: {
      warning: {
        DEFAULT: "#FFD700",
        10: "#FFD7001A",
        20: "#FFD70033",
        background: "#F5C943",
        content: {
          DEFAULT: "#1E2024",
          75: "#1E2024BF",
        },
      },
      error: {
        DEFAULT: "#FF4C4C",
        20: "#FF4C4C33",
      },
      success: {
        DEFAULT: "#28A745",
        background: "#101D14",
        20: "#28A74533",
      },
    },
    text: "#F0F3F7",               // ✅ Added
    textSecondary: "#B0B3B8",       // ✅ Added
    primaryBlack: "#000000",        // ✅ Added
  },
  light: {
    base: {
      100: {
        DEFAULT: "#F3F6FA",
        90: "#F3F6FAE5",
        75: "#F3F6FAB2",
        70: "#F3F6FAB2",
      },
      200: "#E9ECF0",
      300: "#DADDE0",
      content: {
        DEFAULT: "#1E2024",
        75: "#1E2024BF",
        50: "#1E202480",
        20: "#1E202433",
      },
    },
    primary: {
      DEFAULT: "#3669BB",
      60: "#3669BB99",
      20: "#3669BB33",
      content: {
        DEFAULT: "#F0F3F7",
        20: "#F0F3F733",
        50: "#F0F3F780",
      },
    },
    secondary: {
      DEFAULT: "#274F91",
      10: "#274F911A",
      content: "#F0F3F7",
    },
    status: {
      warning: {
        DEFAULT: "#FFD700",
        10: "#FFD7001A",
        20: "#FFD70033",
        background: "#F5C943",
        content: {
          DEFAULT: "#1E2024",
          75: "#1E2024BF",
        },
      },
      error: {
        DEFAULT: "#FF4C4C",
        20: "#FF4C4C33",
      },
      success: {
        DEFAULT: "#28A745",
        background: "#101D14",
        20: "#28A74533",
      },
    },
    text: "#1E2024",               // ✅ Added
    textSecondary: "#6B6B6B",       // ✅ Added
    primaryBlack: "#FFFFFF",        // ✅ Added
  },
};

export default Colors;
