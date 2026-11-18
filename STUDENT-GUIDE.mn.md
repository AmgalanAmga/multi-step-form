# Orbit · Олон алхамтай бүртгэлийн форм бүтээх

Энэ хичээлээр та Next.js, TypeScript ашиглан хэрэглэгчийн мэдээллийг гурван алхмаар авдаг форм бүтээнэ. Эцэст нь хэрэглэгч зургаа оруулж, хадгалагдсан профайлаа харна. Дэлгэц дээрх англи бичвэрийг эх төслийнхтэй адил үлдээлээ.

**Юу бэлдэх вэ?** Командын мөр, код засварлагч, Node.js 22.12 буюу түүнээс шинэ 22.x хувилбар, npm бэлдээрэй. Зураг болон эцсийн бүртгэл хадгалахад өөрийн Vercel Blob бүртгэл хэрэгтэй. Эхний алхмуудыг түлхүүргүйгээр хийж болно.

## 1. Хоосон төслөө ажиллуулах

Терминал дээр шинэ хавтас үүсгээрэй. Дараагийн бүх командыг энэ хавтас дотроос ажиллуулна.

```sh
mkdir orbit-student
cd orbit-student
mkdir -p src/app src/lib/validations src/components/ui src/components/register src/app/api/upload src/app/api/register
```

Доорх эвхэгддэг хэсэг бүрийн гарчиг нь үүсгэх файлын зам юм. Эхлээд дараах тохиргооны файлуудыг үүсгээд доторх кодыг харгалзах файлд бичээрэй. TypeScript-ийн тохиргоон дахь `@/` нь `src/` хавтсыг заана.

<details>
<summary><code>package.json</code></summary>

```json
{
  "name": "multi-step-form",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.2.2",
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-popover": "^1.1.15",
    "@radix-ui/react-slot": "^1.5.0",
    "@vercel/blob": "2.4.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^4.1.0",
    "framer-motion": "^12.38.0",
    "lucide-react": "^1.69.0",
    "next": "16.4.5",
    "react": "19.3.0",
    "react-day-picker": "^9.14.0",
    "react-dom": "19.3.0",
    "react-hook-form": "^7.72.1",
    "server-only": "^0.0.1",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.7.0",
    "zod": "^4.6.7"
  },
  "devDependencies": {
    "@tailwindcss/turbopack": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "babel-plugin-react-compiler": "1.0.0",
    "eslint": "^9",
    "eslint-config-next": "16.4.5",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

</details>

<details>
<summary><code>tsconfig.json</code></summary>

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
```

</details>

<details>
<summary><code>next.config.ts</code></summary>

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
```

</details>

<details>
<summary><code>tailwind.config.ts</code></summary>

```ts
import type { Config } from "tailwindcss";

const config = {
  theme: {
    extend: {
      colors: {
        background: "#f8f9f6",
        foreground: "#25392e",
        card: "#ffffff",
        "card-foreground": "#25392e",
        popover: "#ffffff",
        "popover-foreground": "#25392e",
        primary: "#477b5e",
        "primary-foreground": "#ffffff",
        secondary: "#edf1e8",
        "secondary-foreground": "#25392e",
        muted: "#f1f3ef",
        "muted-foreground": "#858d84",
        accent: "#eef3eb",
        "accent-foreground": "#25392e",
        destructive: "#bd4545",
        border: "#e7ebe3",
        input: "#dfe5dc",
        ring: "#477b5e",
      },
      fontFamily: { sans: ["Arial", "Helvetica", "sans-serif"] },
    },
  },
} satisfies Config;

export default config;
```

</details>

<details>
<summary><code>eslint.config.mjs</code></summary>

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "CallExpression > ArrowFunctionExpression, NewExpression > ArrowFunctionExpression, JSXExpressionContainer > ArrowFunctionExpression, ReturnStatement > ArrowFunctionExpression",
          message: "Extract callbacks into named arrow functions before passing or returning them.",
        },
        {
          selector: "FunctionDeclaration, FunctionExpression",
          message: "Use a named const arrow function.",
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
```

</details>

<details>
<summary><code>index.d.ts</code></summary>

```ts
import type { ControllerProps, FieldPath } from "react-hook-form";
import type { z } from "zod";
import type { RegisterValues, successSchema, draftSchema } from "@/lib/validations/register.schema";

declare global {
  type FormStep = 1 | 2 | 3;
  type RegistrationPayload = Omit<RegisterValues, "confirmPassword" | "profileImage"> & { profileImage: string };
  type RegistrationSummary = z.infer<typeof successSchema>;
  type RegistrationDraft = z.infer<typeof draftSchema>;
  type UploadResult = { url: string };
  type ApiError = { error: string };

  type RegistrationFieldRendererType<Name extends FieldPath<RegisterValues>> = ControllerProps<RegisterValues, Name>["render"];
}
```

</details>

Түр нүүр хуудас үүсгээд төслөө асаана. Дараа нь 6-р алхамд энэ хоёр файлыг бүрэн хувилбараар солино.

```tsx
// src/app/layout.tsx
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
```

```tsx
// src/app/page.tsx
export default function Page() {
  return <main><h1>Join Orbit</h1></main>;
}
```

```sh
npm install
npm run dev
```

**Шалгаарай.** Терминалд гарсан дотоод хаягийг нээхэд **Join Orbit** харагдана. Серверээ ажиллуулсан хэвээр үлдээгээд дараагийн файлуудаа нэмээрэй.

## 2. Талбар бүрийн дүрмийг бичих

Хэрэглэгч «Бат» гэж бичихэд нэрийн шалгалт давна. Харин «Бат1» гэвэл алдаа гарна. Нэрийг шалгахдаа Unicode үсэг таних илэрхийлэл ашигласнаар кирилл нэр оруулах боломжтой. Имэйлийн хоёр талын хоосон зайг арилгаж, үсгийг жижиг болгоно.

Нууц үг наймаас доошгүй тэмдэгттэй, латин том ба жижиг үсэг, цифр, тусгай тэмдэгт агуулна. Баталгаажуулах талбарт ижил утга бичнэ. Профайлд утасны дугаар, төрсөн огноо, зураг шаардлагатай. Яг 13 нас хүрсэн өдрөөс бүртгүүлж болно.

Дараах файлуудаас эхлээд тогтмол утгуудаа, дараа нь Zod схемээ бич. `registerSchema` бүх алхмын өгөгдлийг шалгана. Харин `successSchema` хадгалах мэдээллийг тодорхойлно. Сонгосон зураг эхэндээ браузерын `File` объект байгаад, серверт хадгалах үед URL болсон байгааг анзаараарай.

<details>
<summary><code>src/lib/constants.ts</code></summary>

```ts
export const STORAGE_KEYS = {
  draft: "orbit:registration:v1",
  success: "orbit:registration:success:v1",
} as const;
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
export const MIN_AGE = 13;
export const STEPS = ["Personal info", "Security", "Profile"] as const;

export const UPLOAD_TIMEOUT_MS = 60_000;
```

</details>

<details>
<summary><code>src/lib/validations/register.schema.ts</code></summary>

```ts
import { z } from "zod";
import { IMAGE_TYPES, MAX_IMAGE_BYTES, MIN_AGE } from "@/lib/constants";

const name = z
  .string()
  .trim()
  .min(2, "Enter at least 2 letters.")
  .regex(/^\p{L}+$/u, "Use letters only.");

export const personalSchema = z.object({
  firstName: name,
  lastName: name,
  email: z.string().trim().toLowerCase().pipe(z.email("Enter a valid email address.")),
});

const securityFields = z.object({
  password: z
    .string()
    .min(8, "Use at least 8 characters.")
    .regex(/[A-Z]/, "Add an uppercase letter.")
    .regex(/[a-z]/, "Add a lowercase letter.")
    .regex(/[0-9]/, "Add a number.")
    .regex(/[^A-Za-z0-9\s]/, "Add a special character."),
  confirmPassword: z.string().min(1, "Confirm your password."),
});
type PasswordConfirmationType = { password: string; confirmPassword: string };
const passwordsMatch = (values: PasswordConfirmationType) => values.password === values.confirmPassword;
const matchError = {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
};

export const securitySchema = securityFields.refine(passwordsMatch, matchError);

export const latestBirthDate = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const month = date.getMonth();
  date.setFullYear(date.getFullYear() - MIN_AGE);
  if (date.getMonth() !== month) date.setDate(0);

  return date;
};

const isValidDate = (value: string) => {
  const date = new Date(`${value}T00:00:00`);
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(date.getTime()) &&
    date.getFullYear() === Number(value.slice(0, 4)) &&
    date.getMonth() + 1 === Number(value.slice(5, 7)) &&
    date.getDate() === Number(value.slice(8, 10))
  );
};
const isNotFutureDate = (value: string) => {
  return new Date(`${value}T00:00:00`) <= new Date();
};
const meetsMinimumAge = (value: string) => {
  return new Date(`${value}T00:00:00`) <= latestBirthDate();
};
export const dateOfBirthSchema = z
  .string()
  .min(1, "Select your date of birth.")
  .refine(isValidDate, "Choose a valid date.")
  .refine(isNotFutureDate, "Date cannot be in the future.")
  .refine(meetsMinimumAge, "You must be at least 13 years old.");
const isFile = (value: unknown) => {
  return typeof File !== "undefined" && value instanceof File;
};
const isWithinSizeLimit = (file: File) => {
  return !file || file.size <= MAX_IMAGE_BYTES;
};
const isSupportedImage = (file: File) => {
  const matchesImageType = (type: "image/jpeg" | "image/png" | "image/webp") => {
    return type === file.type;
  };
  return !file || IMAGE_TYPES.some(matchesImageType);
};
export const imageSchema = z
  .custom<File>(isFile, "Choose a profile image.")
  .refine(isWithinSizeLimit, "Image must be 5 MB or smaller.")
  .refine(isSupportedImage, "Choose a JPEG, PNG, or WebP image.");
export const profileSchema = z.object({
  phoneNumber: z
    .string()
    .trim()
    .regex(/^\+?[1-9]\d{7,14}$/, "Enter an international phone number, e.g. +97699112233."),
  dateOfBirth: dateOfBirthSchema,
  profileImage: imageSchema,
});
// Validate security independently so a missing profile file cannot skip password matching.
export const registerSchema = personalSchema.extend(profileSchema.shape).and(securitySchema);
export type PersonalValues = z.infer<typeof personalSchema>;
export type SecurityValues = z.infer<typeof securitySchema>;
export type ProfileValues = z.infer<typeof profileSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
export const successSchema = personalSchema.extend({
  phoneNumber: profileSchema.shape.phoneNumber,
  dateOfBirth: dateOfBirthSchema,
  profileImage: z.templateLiteral(["/api/profile-images/", z.uuid()]),
});
export const draftSchema = z.object({
  step: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  values: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    dateOfBirth: z.union([z.literal(""), dateOfBirthSchema]),
  }),
});
```

</details>

<details>
<summary><code>src/components/register/register-config.ts</code></summary>

```ts
import type { FieldPath } from "react-hook-form";
import type { RegisterValues } from "@/lib/validations/register.schema";

export const defaults = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  dateOfBirth: "",
};

export const fields: Record<FormStep, FieldPath<RegisterValues>[]> = {
  1: ["firstName", "lastName", "email"],
  2: ["password", "confirmPassword"],
  3: ["phoneNumber", "dateOfBirth", "profileImage"],
};

export const copy = {
  1: {
    title: "Let’s start with you.",
    description: "A few details to make this space your own.",
  },
  2: {
    title: "Keep it just yours.",
    description: "A strong password for everything that’s ahead.",
  },
  3: {
    title: "Make yourself at home.",
    description: "The finishing touches. A little personality goes a long way.",
  },
};
```

</details>

<details>
<summary><code>src/lib/storage.ts</code></summary>

```ts
import type { z } from "zod";
export const readStorage = <T>(key: string, schema: z.ZodType<T>): T | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const parsed = schema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
};
export const writeStorage = <T>(key: string, value: T): boolean => {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};
export const removeStorage = (key: string): void => {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(key);
};
```

</details>

## 3. Формын харагдах хэсгийг угсрах

Эхлээд өнгө, фонт, хүрээ болон товчлуурын нийтлэг загварыг нэмнэ. Дараа нь эдгээр жижиг компонентыг ашиглан гурван дэлгэцээ угсарна. Жишээ нь `step-personal.tsx` дотор нэрийн талбарын `name` нь схемийн түлхүүртэй таарч байгааг ол. Ингэснээр тухайн талбарын утга, гарчиг, алдааны мэдэгдэл хоорондоо холбогдоно.

### Нийтлэг загвар ба компонентууд

<details>
<summary><code>src/app/globals.css</code></summary>

```css
@import "tailwindcss";
@config "../../tailwind.config.ts";
```

</details>

<details>
<summary><code>src/lib/utils.ts</code></summary>

```ts
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

</details>

<details>
<summary><code>src/components/ui/button.tsx</code></summary>

```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
        outline:
          "border border-border border-input bg-background hover:bg-accent",
        ghost: "hover:bg-accent",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: { default: "h-10 px-4 py-2", sm: "h-9 px-3", icon: "size-10" },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);
type ButtonType = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };
export const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonType) => {
  const Component = asChild ? Slot : "button";
  return (
    <Component
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};
```

</details>

<details>
<summary><code>src/components/ui/calendar.tsx</code></summary>

```tsx
"use client";
import { DayPicker } from "react-day-picker";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
type CalendarType = ComponentProps<typeof DayPicker>;
export const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarType) => (
  <DayPicker
    showOutsideDays={showOutsideDays}
    navLayout="after"
    className={cn("relative p-3 text-sm", className)}
    classNames={{
      months: "relative flex flex-col gap-4 sm:flex-row",
      month: "space-y-3",
      month_caption: "relative flex h-9 items-center justify-center px-9",
      caption_label: "flex items-center gap-1 text-sm font-medium",
      dropdowns: "flex items-center gap-2",
      dropdown_root:
        "relative rounded-md px-1 focus-within:ring-2 focus-within:ring-ring",
      dropdown:
        "absolute inset-0 w-full cursor-pointer opacity-0 [&_option]:bg-popover [&_option]:text-popover-foreground",
      nav: "absolute inset-x-0 top-0 flex justify-between",
      button_previous:
        "z-10 grid size-9 place-items-center rounded-md hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30",
      button_next:
        "z-10 grid size-9 place-items-center rounded-md hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30",
      chevron: "size-4 fill-current",
      month_grid: "w-full border-collapse",
      weekday:
        "h-8 w-9 text-center text-[11px] font-normal text-muted-foreground",
      day: "size-9 p-0 text-center",
      day_button:
        "grid size-9 place-items-center rounded-md text-xs hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      selected: "[&>button]:bg-primary [&>button]:text-primary-foreground",
      today: "font-bold [&>button]:ring-1 [&>button]:ring-primary/40",
      outside: "text-muted-foreground opacity-40",
      disabled: "pointer-events-none opacity-30",
      hidden: "invisible",
      ...classNames,
    }}
    {...props}
  />
);
```

</details>

<details>
<summary><code>src/components/ui/card.tsx</code></summary>

```tsx
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
type CardType = ComponentProps<"div">;
export const Card = ({ className, ...props }: CardType) => {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card text-card-foreground shadow-sm",
        className,
      )}
      {...props}
    />
  );
};
type CardContentType = ComponentProps<"div">;
export const CardContent = ({ className, ...props }: CardContentType) => {
  return <div className={cn("p-6", className)} {...props} />;
};
```

</details>

<details>
<summary><code>src/components/ui/form.tsx</code></summary>

```tsx
"use client";
import { MotionPanel } from "./motion";
import {
  createContext,
  useContext,
  useId,
  type ComponentProps,
  type ComponentType,
} from "react";
import {
  useController,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { Slot } from "@radix-ui/react-slot";
import { AlertCircle } from "lucide-react";
import { Label } from "./label";
import { cn } from "@/lib/utils";
export const Form = FormProvider;
const FieldContext = createContext({ name: "" });
const ItemContext = createContext({ id: "" });
type FormFieldType<T extends FieldValues, N extends FieldPath<T>> = Omit<
  ControllerProps<T, N>,
  "render"
> & {
  component: ComponentType<Parameters<ControllerProps<T, N>["render"]>[0]>;
};
export const FormField = <T extends FieldValues, N extends FieldPath<T>>({
  component: Component,
  ...props
}: FormFieldType<T, N>) => {
  const controller = useController(props);
  return (
    <FieldContext.Provider value={{ name: props.name }}>
      <Component {...controller} />
    </FieldContext.Provider>
  );
};
type FormItemType = ComponentProps<"div">;
export const FormItem = ({ className, ...props }: FormItemType) => {
  const id = useId();
  return (
    <ItemContext.Provider value={{ id }}>
      <div className={cn("space-y-2", className)} {...props} />
    </ItemContext.Provider>
  );
};
type FormLabelType = ComponentProps<typeof Label>;
export const FormLabel = (props: FormLabelType) => {
  const { id } = useContext(ItemContext);
  return <Label htmlFor={`${id}-input`} {...props} />;
};
type FormControlType = ComponentProps<typeof Slot>;
export const FormControl = (props: FormControlType) => {
  const { id } = useContext(ItemContext);
  return <Slot id={`${id}-input`} {...props} />;
};
type FormMessageType = ComponentProps<"p">;
export const FormMessage = ({ className, ...props }: FormMessageType) => {
  const { id } = useContext(ItemContext);
  const { name } = useContext(FieldContext);
  const { getFieldState, formState } = useFormContext();
  const { error } = getFieldState(name, formState);
  if (!error) return null;
  return (
    <MotionPanel>
      <p
        id={`${id}-message`}
        role="alert"
        className={cn(
          "flex items-start gap-1.5 text-[11px] text-destructive",
          className,
        )}
        {...props}
      >
        <AlertCircle className="mt-0.5 size-3 shrink-0" />
        {String(error.message ?? "")}
      </p>
    </MotionPanel>
  );
};
```

</details>

<details>
<summary><code>src/components/ui/input.tsx</code></summary>

```tsx
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
type InputType = ComponentProps<"input">;
export const Input = ({ className, type, ...props }: InputType) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-lg border border-border border-input bg-background/60 px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
};
```

</details>

<details>
<summary><code>src/components/ui/label.tsx</code></summary>

```tsx
"use client";
import * as LabelPrimitive from "@radix-ui/react-label";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
type LabelType = ComponentProps<typeof LabelPrimitive.Root>;
export const Label = ({ className, ...props }: LabelType) => {
  return (
    <LabelPrimitive.Root
      className={cn(
        "text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    />
  );
};
```

</details>

<details>
<summary><code>src/components/ui/motion.tsx</code></summary>

```tsx
"use client";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";

type MotionPanelType = HTMLMotionProps<"div">;
export const MotionPanel = ({ children, ...props }: MotionPanelType) => (
  <motion.div
    initial={{ opacity: 0, y: 7 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25 }}
    {...props}
  >
    {children}
  </motion.div>
);

export const LoadingSpinner = () => {
  const reducedMotion = useReducedMotion();
  return (
    <motion.span
      className="inline-flex"
      animate={{ rotate: reducedMotion ? 0 : 360 }}
      transition={{
        duration: 1,
        repeat: reducedMotion ? 0 : Infinity,
        ease: "linear",
      }}
    >
      <Loader2 className="size-4" />
    </motion.span>
  );
};
```

</details>

<details>
<summary><code>src/components/ui/popover.tsx</code></summary>

```tsx
"use client";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
type PopoverContentType = ComponentProps<typeof PopoverPrimitive.Content>;
export const PopoverContent = ({
  className,
  align = "center",
  sideOffset = 6,
  ...props
}: PopoverContentType) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 max-w-[calc(100vw-2rem)] rounded-xl border border-border bg-popover p-4 text-popover-foreground shadow-lg outline-none",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
};
```

</details>

<details>
<summary><code>src/components/ui/progress.tsx</code></summary>

```tsx
"use client";
import { motion } from "framer-motion";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ProgressType = Omit<ComponentProps<"div">, "children"> & {
  value?: number | null;
  max?: number;
};

export const Progress = ({
  className,
  value = 0,
  max = 100,
  ...props
}: ProgressType) => {
  const maximum = Number.isFinite(max) && max > 0 ? max : 100;
  const current =
    typeof value === "number" && Number.isFinite(value)
      ? Math.min(maximum, Math.max(0, value))
      : 0;

  return (
    <div
      {...props}
      data-state={current === maximum ? "complete" : "loading"}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-primary/10",
        className,
      )}
    >
      <motion.div
        className="h-full w-full flex-1 rounded-full bg-primary "
        initial={false}
        animate={{ x: `${(current / maximum) * 100 - 100}%` }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </div>
  );
};
```

</details>

<details>
<summary><code>src/components/ui/skeleton.tsx</code></summary>

```tsx
"use client";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
type SkeletonType = HTMLMotionProps<"div">;
export const Skeleton = ({ className, ...props }: SkeletonType) => {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={cn("rounded-lg bg-muted", className)}
      animate={{ opacity: reducedMotion ? 1 : [1, 0.45, 1] }}
      transition={{
        duration: 1.8,
        repeat: reducedMotion ? 0 : Infinity,
        ease: "easeInOut",
      }}
      {...props}
    />
  );
};
```

</details>

<details>
<summary><code>src/components/ui/sonner.tsx</code></summary>

```tsx
"use client";
import { Toaster as Sonner, type ToasterProps } from "sonner";
type ToasterType = ToasterProps;
export const Toaster = (props: ToasterType) => {
  return <Sonner {...props} theme="light" />;
};
```

</details>

<details>
<summary><code>src/components/motion-provider.tsx</code></summary>

```tsx
"use client";

import { MotionConfig } from "framer-motion";
import type { PropsWithChildren } from "react";

export const MotionProvider = ({ children }: PropsWithChildren) => {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
};
```

</details>

### Гурван алхам ба үр дүнгийн дэлгэц

Хувийн мэдээллийн алхмаас эхлээд аюулгүй байдлын болон профайлын алхмыг нэмээрэй. Зураг сонгох үед хэрэглэгч урьдчилан харна. Энэ үед файл браузерт байгаа тул хэрэглэгч илгээхээсээ өмнө зургаа солих боломжтой. `Stepper` нь одоогийн алхмыг, `RegisterActions` нь тухайн үед дарж болох товчлууруудыг харуулна.

<details>
<summary><code>src/components/register/step-personal.tsx</code></summary>

```tsx
"use client";
import type { UseFormReturn } from "react-hook-form";
import { Mail, User } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { RegisterValues } from "@/lib/validations/register.schema";

type StepPersonalType = { form: UseFormReturn<RegisterValues> };

const NameInput: RegistrationFieldRendererType<"firstName" | "lastName"> = ({ field }) => {
  const isFirstName = field.name === "firstName";
  return (
    <FormItem>
      <FormLabel>{isFirstName ? "First name" : "Last name"}</FormLabel>
      <div className="relative">
        <User className="pointer-events-none absolute left-3.5 top-3.75 size-3.75 text-muted-foreground" />
        <FormControl>
          <Input
            {...field}
            autoComplete={isFirstName ? "given-name" : "family-name"}
            placeholder={isFirstName ? "e.g. Alex" : "e.g. Morgan"}
            className="pl-10"
          />
        </FormControl>
      </div>
      <FormMessage />
    </FormItem>
  );
};

const EmailInput: RegistrationFieldRendererType<"email"> = ({ field }) => (
  <FormItem>
    <FormLabel>Email address</FormLabel>
    <div className="relative">
      <Mail className="pointer-events-none absolute left-3.5 top-3.75 size-3.75 text-muted-foreground" />
      <FormControl>
        <Input {...field} type="email" autoComplete="email" placeholder="you@example.com" className="pl-10" />
      </FormControl>
    </div>
    <FormMessage />
    <p className="text-[11px] text-muted-foreground">A little connection starts with the right address.</p>
  </FormItem>
);

export const StepPersonal = ({ form }: StepPersonalType) => (
  <div className="space-y-5">
    <div className="grid gap-5 sm:grid-cols-2">
      <FormField control={form.control} name="firstName" component={NameInput} />
      <FormField control={form.control} name="lastName" component={NameInput} />
    </div>
    <FormField control={form.control} name="email" component={EmailInput} />
  </div>
);
```

</details>

<details>
<summary><code>src/components/register/step-security.tsx</code></summary>

```tsx
"use client";
import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { RegisterValues } from "@/lib/validations/register.schema";

type StepSecurityType = { form: UseFormReturn<RegisterValues> };
const invertVisibility = (previous: boolean) => !previous;

const PasswordInput: RegistrationFieldRendererType<"password" | "confirmPassword"> = ({ field }) => {
  const [visible, setVisible] = useState(false);
  const isPassword = field.name === "password";
  const handleTogglePassword = () => setVisible(invertVisibility);

  return (
    <FormItem>
      <FormLabel>{isPassword ? "Password" : "Confirm password"}</FormLabel>
      <div className="relative">
        <Lock className="pointer-events-none absolute left-3.5 top-3.75 size-3.75 text-muted-foreground" />
        <FormControl>
          <Input
            {...field}
            type={visible ? "text" : "password"}
            autoComplete="new-password"
            className="px-10"
            placeholder={isPassword ? "Create a strong password" : "Enter your password again"}
          />
        </FormControl>
        <Button type="button" variant="ghost" size="icon" className="absolute top-1 right-1 size-9" onClick={handleTogglePassword}>
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </Button>
      </div>
      <FormMessage />
    </FormItem>
  );
};

export const StepSecurity = ({ form }: StepSecurityType) => (
  <div className="space-y-5">
    <FormField control={form.control} name="password" component={PasswordInput} />
    <FormField control={form.control} name="confirmPassword" component={PasswordInput} />
  </div>
);
```

</details>

<details>
<summary><code>src/components/register/image-upload.tsx</code></summary>

```tsx
"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IMAGE_TYPES } from "@/lib/constants";
import { cn } from "@/lib/utils";
type ImageUploadType = {
  value?: File;
  disabled?: boolean;
  onChange: (file: File | undefined) => void;
  onBlur: () => void;
  id?: string;
};
export const ImageUpload = ({ value, disabled = false, onChange, onBlur, ...props }: ImageUploadType) => {
  const [preview, setPreview] = useState<string>();
  const [dragging, setDragging] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const syncImagePreview = () => {
    if (!value) {
      setPreview(undefined);
      return;
    }
    const url = URL.createObjectURL(value);
    setPreview(url);
    const revokePreview = () => {
      return URL.revokeObjectURL(url);
    };
    return revokePreview;
  };

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(syncImagePreview, [value]);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    onChange(event.target.files?.[0]);
    onBlur();
    event.target.value = "";
  };
  const openFilePicker = () => {
    return input.current?.click();
  };
  const removeImage = () => {
    onChange(undefined);
    onBlur();
  };
  const handleDragOver = (event: React.DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = () => {
    return setDragging(false);
  };
  const handleDrop = (event: React.DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDragging(false);
    if (disabled) return;
    onChange(event.dataTransfer.files[0]);
    onBlur();
  };
  /* eslint-enable react-hooks/set-state-in-effect */
  return (
    <div>
      <input ref={input} type="file" disabled={disabled} accept={IMAGE_TYPES.join(",")} className="sr-only" tabIndex={-1} onChange={handleFileChange} />
      {preview ? (
        <div className="flex items-center gap-4 p-4 border rounded-xl border-border bg-muted/30">
          <Image unoptimized width={64} height={64} src={preview} alt="Selected profile preview" className="object-cover rounded-full size-16" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{value?.name}</p>
            <Button {...props} type="button" variant="link" className="h-auto p-0 text-xs" onClick={openFilePicker}>
              Choose another photo
            </Button>
          </div>
          <Button type="button" size="icon" variant="ghost" onClick={removeImage}>
            <X size={16} />
          </Button>
        </div>
      ) : (
        <button
          {...props}
          type="button"
          className={cn(
            "flex w-full flex-col items-center rounded-xl border border-border border-dashed bg-muted/25 px-4 py-6 text-center hover:border-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            dragging && "border-primary bg-primary/10",
          )}
          onClick={openFilePicker}
          onBlur={onBlur}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <span className="grid mb-3 rounded-full size-9 place-items-center bg-primary/10 text-primary">
            <UploadCloud size={18} />
          </span>
          
          <span className="text-xs">
            <strong className="font-semibold text-primary">Click to upload</strong> or drag and drop
          </span>
          <span className="mt-1 text-[10px] text-muted-foreground">JPG, PNG or WebP · Up to 5 MB</span>
        </button>
      )}
    </div>
  );
};
```

</details>

<details>
<summary><code>src/components/register/step-profile.tsx</code></summary>

```tsx
"use client";
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Calendar as CalendarIcon, Phone } from "lucide-react";
import { useFormContext, type UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { ImageUpload } from "./image-upload";
import { latestBirthDate, type RegisterValues } from "@/lib/validations/register.schema";

type StepProfileType = {
  form: UseFormReturn<RegisterValues>;
};

const PhoneNumberInput: RegistrationFieldRendererType<"phoneNumber"> = ({ field }) => {
  return (
    <FormItem>
      <FormLabel>Phone number</FormLabel>
      <div className="relative">
        <Phone className="pointer-events-none absolute left-3.5 top-3.75 size-3.75 text-muted-foreground" />
        <FormControl>
          <Input {...field} type="tel" autoComplete="tel" placeholder="+97699112233" className="pl-10" />
        </FormControl>
      </div>
      <FormMessage />
    </FormItem>
  );
};

const DateOfBirthInput: RegistrationFieldRendererType<"dateOfBirth"> = ({ field: { ref: inputRef, value, onChange, onBlur } }) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (!value) onBlur();
  };
  const handleSelect = (date: Date | undefined) => {
    onChange(date ? format(date, "yyyy-MM-dd") : "");
    onBlur();
    setOpen(false);
  };
  const isDateDisabled = (date: Date) => {
    return date > latestBirthDate() || date < new Date(1900, 0);
  };
  return (
    <FormItem>
      <FormLabel>Date of birth</FormLabel>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button ref={inputRef} type="button" variant="outline" className="justify-start w-full font-normal h-11">
              <CalendarIcon className="mr-2 size-4 text-muted-foreground" />
              {value ? format(parseISO(value), "MMMM d, yyyy") : <span className="text-muted-foreground">Choose your birthday</span>}
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value ? parseISO(value) : undefined}
            onSelect={handleSelect}
            captionLayout="dropdown"
            defaultMonth={value ? parseISO(value) : latestBirthDate()}
            startMonth={new Date(1900, 0)}
            endMonth={latestBirthDate()}
            disabled={isDateDisabled}
            autoFocus
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
      <p className="text-[11px] text-muted-foreground">You must be 13 or older to join.</p>
    </FormItem>
  );
};

const ProfileImageInput: RegistrationFieldRendererType<"profileImage"> = ({ field }) => {
  const form = useFormContext<RegisterValues>();

  const handleChange = (file: File | undefined) => {
    field.onChange(file);
    void form.trigger("profileImage");
  };

  return (
    <FormItem>
      <FormLabel>Profile photo</FormLabel>
      <FormControl>
        <ImageUpload value={field.value} disabled={form.formState.isSubmitting} onChange={handleChange} onBlur={field.onBlur} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export const StepProfile = ({ form }: StepProfileType) => {
  return (
    <div className="space-y-5">
      <FormField control={form.control} name="phoneNumber" component={PhoneNumberInput} />
      <FormField control={form.control} name="dateOfBirth" component={DateOfBirthInput} />
      <FormField control={form.control} name="profileImage" component={ProfileImageInput} />
    </div>
  );
};
```

</details>

<details>
<summary><code>src/components/register/stepper.tsx</code></summary>

```tsx
"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { STEPS } from "@/lib/constants";
import { Progress } from "@/components/ui/progress";
import { Check, User, Lock, Camera } from "lucide-react";

type StepperType = {
  step: number;
};

type StepIndicatorType = { step: number; index: 0 | 1 | 2 };

const icons = [User, Lock, Camera];

const StepIndicator = ({ step, index }: StepIndicatorType) => {
  const label = STEPS[index];
  const number = index + 1;
  const Icon = icons[index];

  return (
    <li className="relative flex flex-col items-center gap-2.5">
      <motion.span
        initial={false}
        animate={{ scale: step === number ? 1.08 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className={cn(
          "grid size-8 place-items-center rounded-full border border-border text-xs font-semibold ",
          step >= number ? "border-primary bg-primary text-primary-foreground shadow-sm" : "border-border bg-card text-muted-foreground",
        )}
      >
        {step > number ? <Check size={15} /> : number}
      </motion.span>
      <span className={cn("flex items-center gap-1.5 text-[11px]", step === number ? "font-semibold text-foreground" : "text-muted-foreground")}>
        <Icon size={12} />
        {label}
      </span>
    </li>
  );
};
export const Stepper = ({ step }: StepperType) => {
  return (
    <nav className="mb-9">
      <div className="relative">
        <div className="absolute h-px top-4 right-8 left-8 bg-border" />
        <ol className="relative flex justify-between">
          <StepIndicator step={step} index={0} />
          <StepIndicator step={step} index={1} />
          <StepIndicator step={step} index={2} />
        </ol>
      </div>
      <Progress value={step === 4 ? 100 : ((step - 1) / 3) * 100} className="h-1 mt-6" />
    </nav>
  );
};
```

</details>

<details>
<summary><code>src/components/register/register-step.tsx</code></summary>

```tsx
import type { UseFormReturn } from "react-hook-form";
import type { RegisterValues } from "@/lib/validations/register.schema";
import { MotionPanel } from "@/components/ui/motion";
import { copy } from "./register-config";
import { StepPersonal } from "./step-personal";
import { StepSecurity } from "./step-security";
import { StepProfile } from "./step-profile";

const stepComponents = [StepPersonal, StepSecurity, StepProfile];

type RegisterStepType = {
  step: FormStep;
  form: UseFormReturn<RegisterValues>;
  disabled: boolean;
};

export const RegisterStep = ({ step, form, disabled }: RegisterStepType) => {
  const ActiveStep = stepComponents[step - 1];
  const { title, description } = copy[step];

  return (
    <>
      <MotionPanel key={`heading-${step}`} className="mb-7">
        <p className="mb-2 text-[10px] font-semibold tracking-[.15em] text-primary uppercase">Step {step} of 3</p>
        <h2 className="text-[27px] font-semibold tracking-[-.04em]">{title}</h2>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">{description}</p>
      </MotionPanel>
      <fieldset disabled={disabled} className="min-w-0">
        <MotionPanel key={step}>
          <ActiveStep form={form} />
        </MotionPanel>
      </fieldset>
    </>
  );
};
```

</details>

<details>
<summary><code>src/components/register/register-actions.tsx</code></summary>

```tsx
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/motion";
import { ArrowLeft, ArrowRight, LockKeyhole } from "lucide-react";

type RegisterActionsType = {
  busy: boolean;
  step: FormStep;
  onBack: () => void;
  submitting: boolean;
  submissionStage: "uploading" | "saving";
};

export const RegisterActions = ({ step, busy, submitting, submissionStage, onBack }: RegisterActionsType) => {
  const disabled = busy || submitting;
  let label = step === 3 ? "Create my profile" : "Continue";
  if (busy) label = "Checking...";
  if (submitting) label = submissionStage === "uploading" ? "Uploading..." : "Saving...";

  return (
    <>
      <div className="flex gap-3 mt-8">
        {step > 1 && (
          <Button type="button" variant="outline" className="h-11" disabled={disabled} onClick={onBack}>
            <ArrowLeft size={15} />
            Back
          </Button>
        )}
        <Button type="submit" disabled={disabled} className="flex-1 text-xs font-semibold h-11">
          {disabled && <LoadingSpinner />}
          {label}
          {!disabled && <ArrowRight className="size-4" />}
        </Button>
      </div>
      <p className="mt-5 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
        <LockKeyhole size={11} />
        Progress is saved when you click Continue.
      </p>
    </>
  );
};
```

</details>

<details>
<summary><code>src/components/register/register-skeleton.tsx</code></summary>

```tsx
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const RegisterSkeleton = () => (
  <Card className="bg-card/90 shadow-[0_20px_80px_-35px_#233c2933,0_3px_10px_#233c2905] backdrop-blur-xl">
    <CardContent className="space-y-7 p-7 sm:p-10">
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-3/4 h-10" />
      <Skeleton className="w-full h-5" />
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-11" />
    </CardContent>
  </Card>
);
```

</details>

<details>
<summary><code>src/components/register/step-success.tsx</code></summary>

```tsx
"use client";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { CheckCircle2, ArrowRight, Mail, Phone, Calendar, User } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";

type StepSuccessType = {
  data: RegistrationSummary;
  onReset: () => void;
};

type SummaryRowType = {
  label: string;
  value: string;
  icon: LucideIcon;
};

const SummaryRow = ({ icon: Icon, label, value }: SummaryRowType) => {
  return (
    <div className="flex items-center gap-3 py-3">
      <Icon className="size-4 shrink-0 text-muted-foreground" />
      <div className="min-w-0">
        <dt className="text-[10px] text-muted-foreground">{label}</dt>
        <dd className="text-sm break-words">{value}</dd>
      </div>
    </div>
  );
};

export const StepSuccess = ({ data, onReset }: StepSuccessType) => {
  const heading = useRef<HTMLHeadingElement>(null);
  const focusSuccessHeading = () => {
    heading.current?.focus();
  };
  useEffect(focusSuccessHeading, []);

  return (
    <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="text-center">
      <div className="relative mx-auto mb-6 w-fit">
        <Image
          unoptimized
          width={96}
          height={96}
          src={data.profileImage}
          alt={`${data.firstName}'s profile`}
          className="object-cover border-4 rounded-full shadow-lg size-24 border-background"
        />
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
          className="absolute bottom-0 right-0"
        >
          <CheckCircle2 className="rounded-full size-8 bg-card text-primary" />
        </motion.span>
      </div>
      <p className="mb-2 text-xs font-semibold tracking-widest uppercase text-primary">You’re all set</p>
      <h2 ref={heading} tabIndex={-1} className="text-3xl font-semibold tracking-tight">
        Welcome, {data.firstName}.
      </h2>
      <p className="mt-3 text-sm text-muted-foreground">Your profile is ready for its next chapter.</p>
      <dl className="px-4 text-left border divide-y my-7 rounded-xl border-border bg-muted/25">
        <SummaryRow icon={User} label="Name" value={`${data.firstName} ${data.lastName}`} />
        <SummaryRow icon={Mail} label="Email" value={data.email} />
        <SummaryRow icon={Phone} label="Phone" value={data.phoneNumber} />
        <SummaryRow icon={Calendar} label="Birthday" value={format(parseISO(data.dateOfBirth), "MMMM d, yyyy")} />
      </dl>
      <Button onClick={onReset} className="w-full h-11">
        Start over
        <ArrowRight size={16} />
      </Button>
    </motion.section>
  );
};
```

</details>

## 4. Зураг болон бүртгэл хадгалах серверээ бичих

Төслийн үндсэн хавтаст `.env.local` үүсгээд өөрийн Vercel Blob private store-ийн токеныг оруул. Энэ файлд нууц түлхүүр байгаа тул Git-д оруулахгүй байхын тулд төслийн `.gitignore` файлд `.env.local`, `node_modules/`, `.next/` гэсэн мөрүүдийг нэмээрэй. Түлхүүр оруулсны дараа серверээ Ctrl+C дарж зогсоогоод `npm run dev` командаар дахин асаана.

```dotenv
BLOB_READ_WRITE_TOKEN=
```

| Хүсэлт | Браузераас илгээх өгөгдөл | Амжилттай үед |
| --- | --- | --- |
| POST /api/upload | Зургийн файлыг FormData-ийн file талбарт хийнэ | Зургийн URL ирнэ |
| POST /api/register | Нэр, овог, имэйл, утас, төрсөн огноо, зургийн URL бүхий JSON | Сервер бүртгэлийг хадгалж, профайлын мэдээлэл буцаана |

Эхний хүсэлтээс URL ирсний дараа хоёр дахь хүсэлтээ илгээнэ. Сервер бүртгэлд ID болон үүсгэсэн цаг нэмж Vercel Blob-д хандалт хязгаарласан JSON файл хадгална. Нууц үг, давтан бичсэн нууц үг хоёр браузер дахь шалгалтад л оролцоно. Энэ дасгалын үр дүн нь хадгалагдсан профайл юм.

<details>
<summary><code>src/lib/blob.ts</code></summary>

```ts
import "server-only";
import { randomUUID } from "node:crypto";
import { put } from "@vercel/blob";

export const uploadImage = async (file: File): Promise<UploadResult> => {
  const id = randomUUID();
  await put(`profile-images/${id}`, file, { access: "private", contentType: file.type });
  return { url: `/api/profile-images/${id}` };
};
```

</details>

<details>
<summary><code>src/lib/upload-errors.ts</code></summary>

```ts
type UploadFailureType = {
  status: number;
  body: ApiError;
};

type ProviderErrorType = {
  error?: unknown;
  cause?: unknown;
  message?: unknown;
  http_code?: unknown;
};

const asProviderError = (value: unknown): ProviderErrorType => (typeof value === "object" && value !== null ? value : {});

export const getUploadFailure = (cause: unknown): UploadFailureType => {
  const outer = asProviderError(cause);
  const error = asProviderError(outer.error ?? outer.cause ?? cause);
  const message = typeof error.message === "string" && error.message.trim() ? error.message : "Image upload failed.";
  const status =
    typeof error.http_code === "number" && Number.isInteger(error.http_code) && error.http_code >= 400 && error.http_code <= 599 ? error.http_code : 500;

  return { status, body: { error: message } };
};
```

</details>

<details>
<summary><code>src/app/api/upload/route.ts</code></summary>

```ts
import { NextResponse } from "next/server";
import { uploadImage } from "@/lib/blob";
import { getUploadFailure } from "@/lib/upload-errors";
import { imageSchema } from "@/lib/validations/register.schema";

export const runtime = "nodejs";

export const POST = async (request: Request) => {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json<ApiError>({ error: "Send the image as form data." }, { status: 400 });
  }

  const result = imageSchema.safeParse(formData.get("file"));

  if (!result.success) {
    return NextResponse.json<ApiError>({ error: result.error.issues[0].message }, { status: 400 });
  }

  if (result.data.size === 0) {
    return NextResponse.json<ApiError>({ error: "Choose an image that is not empty." }, { status: 400 });
  }

  try {
    const image = await uploadImage(result.data);
    return NextResponse.json<UploadResult>(image);
  } catch (error) {
    const failure = getUploadFailure(error);
    return NextResponse.json<ApiError>(failure.body, { status: failure.status });
  }
};
```

</details>

<details>
<summary><code>src/lib/registrations.ts</code></summary>

```ts
import "server-only";
import { randomUUID } from "node:crypto";
import { put } from "@vercel/blob";
import { successSchema } from "@/lib/validations/register.schema";

type StoredRegistrationType = RegistrationSummary & {
  id: string;
  createdAt: string;
};

export const saveRegistration = async (values: RegistrationSummary): Promise<StoredRegistrationType> => {
  const registration: StoredRegistrationType = {
    ...successSchema.parse(values),
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };
  await put(`registrations/${registration.id}.json`, JSON.stringify(registration), {
    access: "private",
    contentType: "application/json",
  });

  return registration;
};
```

</details>

<details>
<summary><code>src/app/api/register/route.ts</code></summary>

```ts
import { NextResponse } from "next/server";
import { getUploadFailure } from "@/lib/upload-errors";
import { saveRegistration } from "@/lib/registrations";
import { successSchema } from "@/lib/validations/register.schema";

export const runtime = "nodejs";

const errorResponse = (error: string, status: number) => NextResponse.json<ApiError>({ error }, { status });

export const POST = async (request: Request) => {
  let data: unknown;

  try {
    data = await request.json();
  } catch {
    return errorResponse("Send valid JSON data.", 400);
  }

  const result = successSchema.safeParse(data);

  if (!result.success) {
    return errorResponse(result.error.issues[0].message, 400);
  }

  try {
    const registration = await saveRegistration(result.data);
    return NextResponse.json(registration, { status: 201 });
  } catch (error) {
    const failure = getUploadFailure(error);
    return errorResponse(failure.body.error, failure.status);
  }
};
```

</details>

<details>
<summary><code>src/lib/registration-client.ts</code></summary>

```ts
import { z } from "zod";
import { successSchema, type RegisterValues } from "@/lib/validations/register.schema";

const UPLOAD_TIMEOUT_MS = 90_000;
const SAVE_TIMEOUT_MS = 90_000;
const apiErrorSchema = z.object({ error: z.string() });
const uploadSchema = z.object({
  url: successSchema.shape.profileImage,
});

export const uploadProfileImage = async (file: File): Promise<UploadResult> => {
  const body = new FormData();
  body.append("file", file);
  const response = await fetch("/api/upload", {
    method: "POST",
    body,
    signal: AbortSignal.timeout(UPLOAD_TIMEOUT_MS),
  });
  const result: unknown = await response.json();
  if (!response.ok) {
    const parsed = apiErrorSchema.safeParse(result);
    throw new Error(parsed.success ? parsed.data.error : "Upload failed. Please try again.");
  }
  return uploadSchema.parse(result);
};

export const saveProfile = async (values: RegisterValues, imageUrl: string): Promise<RegistrationSummary> => {
  const payload = successSchema.parse({
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    phoneNumber: values.phoneNumber,
    dateOfBirth: values.dateOfBirth,
    profileImage: imageUrl,
  });
  const response = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(SAVE_TIMEOUT_MS),
  });
  const result: unknown = await response.json();
  if (!response.ok) {
    const parsed = apiErrorSchema.safeParse(result);
    throw new Error(parsed.success ? parsed.data.error : "Registration could not be saved. Please try again.");
  }
  return successSchema.parse(result);
};
```

</details>

## 5. Алхмуудыг нэг формд холбох

Нэг `useForm` объект бүх талбарын утгыг барина. `step` нь аль хэсгийг харуулахыг шийднэ. Дараах гурван үйлдлийг кодоос дарааллаар нь олоорой.

1. **Continue.** `form.trigger(fields[step])` тухайн алхмын талбаруудыг шалгана. Алдаагүй бол дараагийн алхмын дугаар болон зөвшөөрсөн талбаруудыг localStorage-д хадгална.
2. **Хуудсаа сэргээх.** `useEffect` браузер дээр ажиллахад өмнөх үр дүн эсвэл ноорог уншигдана. Нууц үг, зураг хадгалагддаггүй. Гурав дахь алхмаас сэргээсэн бол зургаа дахин сонгож, нууц үгээ дахин оруулна.
3. **Илгээх.** Эцсийн товч бүх талбарыг шалгана. Алдаатай бол тэр талбарын алхамд буцна. Зураг амжилттай илгээгдсэн ч бүртгэл хадгалах хүсэлт бүтэлгүйтвэл форм нээлттэй байх хугацаанд ижил зургийн URL-г дахин ашиглана.

<details>
<summary><code>src/components/register/register-form.tsx</code></summary>

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, type SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { registerSchema, draftSchema, successSchema, type RegisterValues } from "@/lib/validations/register.schema";
import { STORAGE_KEYS } from "@/lib/constants";
import { readStorage, writeStorage, removeStorage } from "@/lib/storage";
import { Stepper } from "./stepper";
import { StepSuccess } from "./step-success";
import { defaults, fields } from "./register-config";
import { RegisterStep } from "./register-step";
import { RegisterActions } from "./register-actions";
import { RegisterSkeleton } from "./register-skeleton";
import { saveProfile, uploadProfileImage } from "@/lib/registration-client";

type UploadedImageType = {
  file: File;
  result: UploadResult;
};
export const RegisterForm = () => {
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: defaults,
  });
  const [step, setStep] = useState<FormStep>(1);
  const [hydrated, setHydrated] = useState(false);
  const [summary, setSummary] = useState<RegistrationSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const uploadedImage = useRef<UploadedImageType | null>(null);
  const [submissionStage, setSubmissionStage] = useState<"uploading" | "saving">("uploading");
  const pending = useRef(false);

  const { reset, setFocus } = form;

  const hydrateForm = () => {
    const success = readStorage(STORAGE_KEYS.success, successSchema);
    if (success) {
      setSummary(success);
    } else {
      const draft = readStorage(STORAGE_KEYS.draft, draftSchema);
      if (draft) {
        reset({ ...defaults, ...draft.values });
        setStep(draft.step);
      }
    }
    setHydrated(true);
  };
  // Restore browser storage after hydration to keep server and client HTML consistent.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(hydrateForm, [reset]);

  const focusCurrentStep = () => {
    if (hydrated && !summary) setFocus(fields[step][0]);
  };

  useEffect(focusCurrentStep, [hydrated, step, summary, setFocus]);
  const next = async () => {
    if (pending.current || step === 3) return;
    pending.current = true;
    setBusy(true);

    try {
      const isValid = await form.trigger(fields[step], { shouldFocus: true });
      if (!isValid) return;

      const nextStep = step === 1 ? 2 : 3;
      const { firstName, lastName, email, phoneNumber, dateOfBirth } = form.getValues();
      const draft: RegistrationDraft = {
        step: nextStep,
        values: { firstName, lastName, email, phoneNumber, dateOfBirth },
      };

      writeStorage(STORAGE_KEYS.draft, draft);
      setStep(nextStep);
    } finally {
      pending.current = false;
      setBusy(false);
    }
  };
  const submit = async (values: RegisterValues) => {
    if (pending.current) return;
    pending.current = true;
    setError(null);
    try {
      let upload = uploadedImage.current?.file === values.profileImage ? uploadedImage.current.result : null;
      if (!upload) {
        setSubmissionStage("uploading");
        upload = await uploadProfileImage(values.profileImage);
        uploadedImage.current = { file: values.profileImage, result: upload };
      }
      setSubmissionStage("saving");
      const safeSummary = await saveProfile(values, upload.url);
      writeStorage(STORAGE_KEYS.success, safeSummary);
      removeStorage(STORAGE_KEYS.draft);
      setSummary(safeSummary);
      reset(defaults);
      uploadedImage.current = null;
      toast.success("Your profile is ready. Welcome to Orbit!");
    } catch (cause) {
      const message = cause instanceof Error && cause.name !== "ZodError" ? cause.message : "Registration could not be completed. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      pending.current = false;
    }
  };
  const startOver = () => {
    uploadedImage.current = null;
    removeStorage(STORAGE_KEYS.draft);
    removeStorage(STORAGE_KEYS.success);
    reset(defaults);
    setError(null);
    setStep(1);
    setSummary(null);
  };
  const disabled = busy || form.formState.isSubmitting;
  const handleInvalidSubmission: SubmitErrorHandler<RegisterValues> = (errors) => {
    const hasInvalidStep = (number: FormStep) => {
      const hasFieldError = (field: keyof RegisterValues) => {
        return errors[field];
      };
      return fields[number].some(hasFieldError);
    };
    const invalid = ([1, 2, 3] as const).find(hasInvalidStep);
    if (invalid) setStep(invalid);
  };
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (disabled) return;
    if (step < 3) {
      void next();
      return;
    }
    void form.handleSubmit(submit, handleInvalidSubmission)(event);
  };
  const handleBack = () => {
    setError(null);
    if (step > 1) setStep(step === 3 ? 2 : 1);
  };
  if (!hydrated) return <RegisterSkeleton />;

  return (
    <Card className="bg-card/90 shadow-[0_20px_80px_-35px_#233c2933,0_3px_10px_#233c2905] backdrop-blur-xl">
      <CardContent className="p-7 sm:p-10">
        <Stepper step={summary ? 4 : step} />
        {summary ? (
          <StepSuccess data={summary} onReset={startOver} />
        ) : (
          <Form {...form}>
            <form noValidate onSubmit={handleSubmit}>
              <RegisterStep step={step} form={form} disabled={disabled} />
              {error && (
                <div
                  role="alert"
                  className="flex gap-2 p-3 mt-5 text-xs border rounded-lg border-border border-destructive/20 bg-destructive/5 text-destructive"
                >
                  <AlertCircle className="size-4 shrink-0" />
                  {error}
                </div>
              )}
              <RegisterActions step={step} busy={busy} submitting={form.formState.isSubmitting} submissionStage={submissionStage} onBack={handleBack} />
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};
```

</details>

## 6. Нүүр хуудсыг дуусгах

Эхний алхамд бичсэн түр `layout.tsx`, `page.tsx` хоёроо дараах кодоор солиорой. Нүүр хуудас `RegisterForm`-ыг харуулна. Layout дотор нийтлэг загвар болон мэдэгдэл харуулах `Toaster`-ийг нэг удаа холбоно.

<details>
<summary><code>src/app/layout.tsx</code></summary>

```tsx
import "./globals.css";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/sonner";
import { MotionProvider } from "@/components/motion-provider";

export const metadata: Metadata = {
  title: "Join Orbit · A little more you",
  description: "Your next chapter starts here. Set up your Orbit profile in three simple steps.",
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body className="m-0 bg-background bg-[radial-gradient(ellipse_at_10%_40%,#dbe6ce55,transparent_50%)] font-sans text-foreground antialiased scheme-light [&_button]:cursor-pointer [&_button:disabled]:cursor-wait [&_select]:cursor-pointer">
        <MotionProvider>
          {children}
          <Toaster richColors position="bottom-right" />
        </MotionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

</details>

<details>
<summary><code>src/app/page.tsx</code></summary>

```tsx
import Link from "next/link";
import { Asterisk, ShieldCheck } from "lucide-react";
import { RegisterForm } from "@/components/register/register-form";

const Home = () => {
  return (
    <div className="min-h-screen px-5 sm:px-10">
      <header className="flex items-center justify-between h-24 mx-auto max-w-7xl">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <span className="grid rounded-full size-8 place-items-center bg-primary text-primary-foreground">
            <Asterisk size={25} />
          </span>
          orbit<span className="text-primary">.</span>
        </Link>
      </header>

      <main className="mx-auto grid max-w-6xl items-center gap-12 pb-16 pt-8 lg:min-h-[calc(100vh-176px)] lg:grid-cols-[1fr_1.12fr] lg:gap-20 lg:pt-0">
        <section className="relative">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border border-primary/15 bg-primary/5 px-3 py-1.5 text-[11px] font-semibold tracking-[.13em] text-primary">
            <span className="size-1.5 rounded-full bg-primary" /> A FRESH START, MADE SIMPLE
          </div>
          <h1 className="max-w-lg text-5xl leading-[1.08] font-semibold tracking-[-.055em] sm:text-6xl">
            Big possibilities.
            <br />A little more <span className="font-serif italic font-normal text-primary">you.</span>
          </h1>
          <p className="max-w-sm mt-6 text-base leading-7 text-muted-foreground">
            Good things start with a hello. Create your profile and make space for what’s next.
          </p>
          <div className="flex items-center gap-3 mt-10 text-xs text-muted-foreground">
            <ShieldCheck className="size-5 text-primary" />
            <span>Your details. Your control. Always.</span>
          </div>
        </section>

        <RegisterForm />
      </main>

      <footer className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 border-t border-border py-6 text-[11px] text-muted-foreground">
        <span>© {new Date().getFullYear()} Orbit. A space for your next chapter.</span>
        <span>Thoughtfully simple. Uniquely you.</span>
      </footer>
    </div>
  );
};

export default Home;
```

</details>

<details>
<summary><code>src/app/error.tsx</code></summary>

```tsx
"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type ErrorBoundaryType = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

const ErrorBoundary = ({ reset }: ErrorBoundaryType) => {
  return (
    <main className="grid min-h-screen place-items-center p-6">
      <section className="max-w-md space-y-5 text-center">
        <AlertCircle className="mx-auto size-10 text-destructive" />
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="text-muted-foreground">Your saved progress is still on this device. Try opening the form again.</p>
        <Button onClick={reset}>Try again</Button>
      </section>
    </main>
  );
};
export default ErrorBoundary;
```

</details>

<details>
<summary><code>src/app/icon.svg</code></summary>

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="20" fill="#477b5e"/><g stroke="#fff" stroke-width="5" stroke-linecap="round"><path d="M32 15v34M17 23l30 18M17 41l30-18"/></g></svg>
```

</details>

## 7. Өөрийн бүтээсэн формыг шалгах

Өөр терминал нээгээд төслийн хавтсанд дараах командуудыг ажиллуулаарай.

```sh
npm run typecheck
npm run lint
npm run build
```

Дараа нь браузерт дараах туршилтуудыг хийнэ. Туршилтад зохиомол мэдээлэл болон хувийн мэдээлэлгүй зураг ашиглаарай.

| Хийх үйлдэл | Хүлээгдэх үр дүн |
| --- | --- |
| Эхний алхамд нэрээ хоосон үлдээгээд Continue дар | Алдаа тухайн талбарын доор харагдаж, эхний алхам дээр үлдэнэ |
| Нэрт Бат, овогт Болд, имэйлд bat@example.com гэж оруулаад үргэлжлүүл. Хуудсаа сэргээгээд Back дар | Оруулсан хувийн мэдээлэл хэвээр байна |
| Туршилтын нууц үгт Orbit123! гэж бичээд баталгаажуулахдаа нэг тэмдэгт зөрүүл | Хоёр утга таарах хүртэл дараагийн алхамд шилжихгүй |
| Утсанд +97699112233 оруулж, төрсөн огноогоо 2000-01-15 гэж сонго. 5 МиБ-аас бага PNG зураг сонго | Сонгосон зургийн урьдчилсан дүрс гарна |
| Эцсийн товчийг дарж DevTools → Network хэсгийг хар | Эхлээд upload, дараа нь register хүсэлт амжилттай дуусч, профайлын хураангуй харагдана |
| Амжилтын дэлгэц дээр хуудсаа сэргээгээд Start over дар | Сэргээхэд хураангуй үлдэнэ. Start over дарахад форм эхний алхамд хоосон нээгдэнэ. Өмнөх серверийн бүртгэл хадгалагдсан хэвээр байна |

**Алдаа гарвал хаанаас эхлэх вэ?** Талбар улаан бол тухайн талбарын мэдэгдлийг унш. Зураг илгээх хүсэлт амжилтгүй бол файлын төрөл, хэмжээ, дараа нь серверийн терминал болон Vercel Blob тохиргоогоо шалга. Зураг илгээгдсэн ч хураангуй гарахгүй бол Network хэсгээс `/api/register` хүсэлтийн хариуг нээ. Ингэж шалгавал аль үйлдэл дээр алдаа гарсныг ялгаж чадна.
