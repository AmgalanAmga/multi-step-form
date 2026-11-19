# Firstleaf · Олон алхамт бүртгэлийн форм бүтээх гарын авлага

Энэ төслийг дуусгахад хэрэглэгч гурван алхмаар мэдээллээ оруулж, профайл зургаа сонгон, бүртгэлээ хадгалж чадна. Эхлээд **нэг талбарыг эхнээс нь дуустал** ажиллуул. Дараа нь ижил зарчмаар бусад талбарыг нэм. Алхам бүрийн шалгалтыг хийсний дараа цааш үргэлжлээрэй. Гацвал төгсгөл дэх **Файл бүрийн лавлах код** хэсгээс файлын нэрээр хайж, өөрийн бичсэн хэсэгтэй харьцуул.

### Эхлээд хаана код бичихээ сонго

| Хийх зүйл | Хаана бичих вэ? | Жишээ |
|---|---|---|
| Хэрэглэгчид харагдах хэсэг | `src/components/register/` | Сонгосон зургийн нэр, солих товчийг `ImageUploadPreview.tsx` дотор байрлуулна. |
| React-ийн төлөв, үйлдлийг хамтад нь удирдах | `src/hooks/` | Зураг солигдоход өмнөх урьдчилсан харагдацын URL-ийг `useImageUpload.ts` чөлөөлнө. |
| Өгөгдөл шалгах, унших, хадгалах | `src/lib/` | Имэйл хаягийн дүрмийг `register.schema.ts` дотор тодорхойлно. |
| HTTP хүсэлт хүлээн авах | `src/app/api/` | `upload/route.ts` нь формоор ирсэн зургийг шалгаад хадгална. |

Төслийн компонент бүрийг нэртэй нь ижил файлд зарла. Жишээлбэл, `ImageDropZone` компонентыг `ImageDropZone.tsx` дотор байрлуулна. ESLint энэ дүрмийг `src/components/ui/`-аас бусад хэсэгт шалгана. Next.js-ийн тусгай файлууд `page.tsx`, `layout.tsx` зэрэг нэрээ хадгална. Үйлдэл бүрд утгатай нэр бүхий суман функц зарлаж, зэрэгцээ хоёр функцийн хооронд нэг хоосон мөр үлдээгээрэй.

## 1. Ажлын орчноо бэлдэх

Бэлэн төслийн хавтсанд ажиллаж байгаа бол терминалдаа дараах командыг ажиллуул.

```sh
npm ci
npm run dev
```

Шинээр эхлэх бол хоосон ажлын хавтсанд Next.js төсөл үүсгэ. TypeScript, App Router, Tailwind CSS, ESLint, `src/` хавтас, `@/*` alias сонго.

```sh
npx create-next-app@latest firstleaf
cd firstleaf
```

Хувилбаруудыг жишээ төсөлтэй тааруулахын тулд лавлах хэсгийн `package.json`-ийг ашиглаад `npm install` ажиллуул. Дараа нь тохиргооны файлуудыг тухайн замд үүсгэ. Хөгжүүлэлтийн серверээ `npm run dev` командаар асааж, хөтөч дээр `http://localhost:3000` хаягийг нээ. Эхний зургаан хэсгийг Blob токенгүй хийж болно.

## 2. Талбар болон өгөгдлийн дүрмээ тодорхойлох

`src/lib/constants.ts` дотор алхмуудын нэр, насны доод хязгаар, зургийн төрөл, хэмжээ болон хадгалалтын түлхүүрүүдийг зарла. Дараа нь `src/lib/validations/register.schema.ts` дотор доорх гурван Zod схемийг үүсгэ.

| Схем | Талбар | Зөвшөөрөх утга |
|---|---|---|
| personalSchema | firstName, lastName | Захын хоосон зайг арилгахад дор хаяж хоёр үсэг үлдэнэ. Кирилл үсэг зөвшөөрнө. |
| personalSchema | email | Захын зайг арилгаж, жижиг үсэгт шилжүүлээд имэйл хаягийн хэлбэрийг шалгана. |
| securitySchema | password, confirmPassword | Доод тал нь 8 тэмдэгт, англи том ба жижиг үсэг, цифр, тусгай тэмдэгт орно. Хоёр утга таарах ёстой. |
| profileSchema | phoneNumber | Эхэндээ нэг нэмэх тэмдэгтэй байж болно. Эхний цифр 1–9, нийт 8–15 цифр байна. |
| profileSchema | dateOfBirth | YYYY-MM-DD хэлбэртэй бодит огноо байна. Хэрэглэгч өнөөдрийн байдлаар 13 нас хүрсэн байна. |
| profileSchema | profileImage | JPEG, PNG эсвэл WebP төрлийн File байна. Дээд хэмжээ 5 × 1024 × 1024 байт. |

Гурван схемээ нэгтгэн `registerSchema` үүсгээд `z.infer` ашиглан `RegisterValues` төрлийг гарга. Формд зураг нь `File`, хадгалсан бүртгэлд зураг нь URL мөр болдог. Иймээс сервер рүү илгээх мэдээлэлд тусдаа `successSchema` зарла. Түр хадгалах мэдээллийн бүтцийг `draftSchema`-аар тодорхойл. Хамтын төрлүүдийг төслийн үндсэн хавтас дахь `index.d.ts` файлд байрлуул.

**Өөрийгөө шалгаарай.** `Бат` нэр зөвшөөрөгдөж, `Б4т` дээр алдаа гарах ёстой. Зураг сонгоогүй байсан ч хоёр дахь алхам нууц үгийн зөрүүг илрүүлэх ёстой.

## 3. shadcn/ui загварын суурь компонентуудаа зарлах

Талбарын бүтэц, шошго, алдааны мэдээлэлд shadcn/ui-ийн `Field`, `FieldLabel`, `FieldError` компонентыг ашиглана.

| Үүсгэх компонент, файл | Хийх ажил |
|---|---|
| Button, Input, Label | HTML-ийн props-ийг үндсэн элементэд дамжуул. Button-д харагдах хувилбар, хэмжээ, disabled болон focus төлөв нэм. |
| Card, CardContent | Гадна хүрээ, доторх зайг хоёр тусдаа компонентод хариуцуул. |
| useController | Алхам бүр талбарын нэр болон control-ийг дамжуулна. Талбарын компонент useController ашиглан утга болон алдааны төлөвийг авна. |
| Field, FieldLabel, FieldError | FieldLabel-ийн htmlFor утгыг оролтын id-тай тааруулж, алдааг FieldError дотор харуулна. |
| Popover, PopoverTrigger, PopoverContent | Төрсөн өдөр сонгох цонхыг Radix Popover ашиглан нээж, хаа. |
| Calendar, CalendarDayButton, CalendarOption | DayPicker-ийн өдөр болон сонголтыг тусдаа компонентоор зур. Өнөөдөр болон сонгосон өдрийг ялга. |
| Progress, Skeleton, Toaster | Алхмын ахиц, сэргээж буй формын түр дүрс, үйлдлийн мэдэгдлийг харуул. Toaster-ийг Sonner.tsx файлд зарлана. |
| MotionPanel, Loader2 | Алхам солигдох хөдөлгөөн болон хүсэлт хүлээх тэмдгийг үүсгэ. MotionProvider-ийг src/components/MotionProvider.tsx дотор зарла. |

`src/lib/utils.ts` доторх `cn` функцээр үндсэн болон гаднаас өгсөн className-ийг нэгтгэ. Cursor, өнгө, хэмжээ зэрэг Tailwind class-ийг тухайн товч, дүрс, сонголтын өөрийнх нь элементэд бич.

## 4. Нэг талбарыг формтой холбох

Эхлээд `register/input/EmailInput.tsx` болон `register/steps/StepPersonal.tsx` үүсгэ. Доорх жишээнд `field` нь одоогийн утга, өөрчлөлтийн функц, blur болон focus-д хэрэгтэй ref-ийг агуулна.

```tsx
export const EmailInput = ({ name, control }: RegistrationFieldProps<"email">) => {
  const { field, fieldState } = useController({ name, control });
  return (
    <Field data-invalid={fieldState.invalid} className="gap-2">
      <FieldLabel htmlFor={field.name}>Email address</FieldLabel>
      <div className="relative">
        <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-600" />
        <Input id={field.name} {...field} type="email" autoComplete="email" placeholder="you@example.com" className="h-11 pl-10" />
      </div>
      <FieldError id={`${field.name}-error`}>{fieldState.error?.message}</FieldError>
      <p className="text-xs text-slate-600">A little connection starts with the right address.</p>
    </Field>
  );
};
```

StepPersonal дотор талбарыг дараах байдлаар холбоно.

```tsx
<EmailInput control={form.control} name="email" />
```

`src/hooks/useRegisterForm.ts` дотор `useForm<RegisterValues>` зарлаж, `resolver: zodResolver(registerSchema)`, `mode: "onTouched"`, `defaultValues: defaults` тохируул. Энэ шатанд hook-оос `{ form }` буцаахад хангалттай. `RegisterForm.tsx`-ийн эхэнд `"use client";` бичээд компонент дотроо `const { form } = useRegisterForm();` гэж дууд. `<Form {...form}>` дотор жинхэнэ `<form>` байрлуулж, эхний алхмаа зур. `src/app/page.tsx`-аас RegisterForm-ийг дууд.

**Шалгах.** Имэйлд `test` бичээд өөр талбар руу шилж. Алдаа имэйлийн доор гарна. `bat@example.com` болгоход алдаа арилна. Label дээр дарахад имэйлийн талбар focus авна.

## 5. Бүртгэлийн нэрлэсэн компонентуудыг бүтээх

Доорх замууд `src/components/register/`-аас эхэлнэ. Талбарын компонент утгаа React Hook Form-оос авна. Харин нууц үг харагдах эсэх, огнооны цонх нээлттэй эсэх зэрэг дэлгэцийн түр төлөвийг тухайн компонент өөрөө удирдана.

| Хавтас | Зарлах компонент | Хариуцах үйлдэл |
|---|---|---|
| input | NameInput, EmailInput | NameInput-ийг firstName, lastName хоёрт дахин ашигла. field.name-аас шалтгаалан label, placeholder-ийг сонго. |
| input | PasswordInput | password болон confirmPassword-д ашигла. Нүдний товчоор type-ийг соль. Товч нь type="button" байна. |
| input | PhoneNumberInput, DateOfBirthInput | Утасны утгыг мөрөөр хадгал. Календарийн Date утгыг сонгоход YYYY-MM-DD мөр болгон field.onChange-д дамжуул. |
| input | ImageDropZone, ImageUploadPreview | Файл байхгүй үед ImageDropZone сонгох товчийг харуулна. Файлтай үед ImageUploadPreview зураг, нэр, солих болон устгах товчийг харуулна. |
| input | ImageUpload, ProfileImageInput | ImageUpload нь value, onChange, onBlur, disabled авна. Файл сонгох, чирж оруулах, урьдчилж харах, устгах үйлдэлтэй байна. ProfileImageInput үүнийг формын талбарт холбоно. |
| steps | StepPersonal, StepSecurity, StepProfile | Тус бүр form prop авч, хоёрдугаар хэсгийн хүснэгтэд заасан талбаруудаа харгалзах оролтын компонентоор харуулна. |
| steps | RegisterStep | step, form, disabled авч, тухайн алхмын гарчиг, тайлбар, талбаруудыг зурна. |
| stepper | Stepper | Алхам бүрийн дугаар, нэр, төлөвийг харуулж, алхмуудыг шугамаар холбоно. Дараагийн алхамд шилжихэд хоёр алхмын хоорондох шугам ногоон болно. |
| form | RegisterActions, RegisterSkeleton | Эхний алхамд Continue, дараа нь Back, эцэст нь илгээх товч харуул. Түр хадгалсан төлвийг унших үед RegisterSkeleton үзүүл. |
| success | SummaryRow, StepSuccess | SummaryRow-д icon, label, value дамжуул. StepSuccess-д data, onReset дамжуулж зураг, мэдээллийн мөрүүд, дахин эхлэх товчийг зур. |
| form | RegisterForm | `useRegisterForm()`-оос ирсэн төлвөөр дэлгэцээ сонго. Сэргээж байвал RegisterSkeleton, амжилттай бол StepSuccess, бусад үед RegisterStep болон RegisterActions харуул. |

**Шалгах.** Нууц үг харах товч алхам солих ёсгүй. Төрсөн өдрөө сонгоход огнооны цонх хаагдана. Зургийг солиход шинэ зураг харагдаж, устгахад файл сонгох хэсэг дахин гарна. Object URL ашигласан бол зураг солигдох болон компонент салгагдахад өмнөх URL-ийг чөлөөл.

### Зургийн талбарыг бие даан угсрах

1. `src/hooks/useImageUpload.ts` дотор `value`, `disabled`, `onChange`, `onBlur` авдаг hook зарла. Нууц file input-д хандах ref, файл чирж байгаа эсэх төлөв, урьдчилсан харагдацын URL энд байна.
2. Файл сонгоход `event.target.files?.[0]`-ийг, чирж оруулахад `event.dataTransfer.files[0]`-ийг ав. Аль ч тохиолдолд `onChange(file)`, дараа нь `onBlur()` дууд. Ижил файлыг дахин сонгоход change event үүсэхийн тулд сонгосны дараа file input-ийн утгыг хоосол.
3. `ImageUpload.tsx` дотор hook-оо дууд. Далд input-д ref-ийг холбо. Урьдчилсан харагдац бэлэн үед ImageUploadPreview-д файлын нэр, URL, солих болон устгах функц дамжуул. Бусад үед ImageDropZone-д дарах, чирэх, буулгах функцүүдийг дамжуул.
4. `ProfileImageInput.tsx` дотор хэрэглэгч файл сонгоход `field.onChange(file)` дуудаад `form.trigger("profileImage")` ажиллуул. Ингэснээр файлын алдааг хэрэглэгч илгээх товч дарахаас өмнө харна.

**Туршилт.** Нэг зураг сонгоод устга. Яг тэр зургаа дахин сонгоход нэр, зураг хоёулаа гарч байвал input зөв шинэчлэгдэж байна. Энэ үед Network хэсэгт upload хүсэлт гарах ёсгүй. Сервер рүү зураг илгээх үйлдэл сүүлийн алхмын товчоор эхэлнэ.

## 6. Алхам шилжүүлэх ба түр хадгалах

Доорх шилжилтүүдийг `src/hooks/useRegisterForm.ts` дотор хэрэгжүүл. `RegisterActions` нь товчнуудыг харуулна. Continue болон эцсийн илгээх товч хоёулаа HTML формын submit үйлдлийг эхлүүлдэг учраас аль үйлдлийг хийхийг `handleSubmit` одоогийн алхмаар шийднэ.


1. `form/register-config.ts` дотор `defaults`, алхам бүрийн талбарын нэрсийг агуулсан `fields`, дэлгэцийн гарчиг, тайлбар бүхий `copy`-г зарла.
2. Continue дарахад `await form.trigger(fields[step], { shouldFocus: true })` ажиллуул. Алдаатай бол одоогийн алхамдаа үлдэнэ. Зөв бол дараагийн алхмын дугаар болон зөвшөөрсөн утгуудыг localStorage-д бичээд алхмыг солино.
3. Back дарахад өмнөх алхам руу шилж. Бүх алхамд нэг useForm ашигласнаар бичсэн утга хадгалагдана.
4. `src/lib/storage.ts` дотор унших, бичих, устгах функц үүсгэ. Сэргээхдээ JSON-ийг схемээр шалга. Эвдэрсэн өгөгдөл байвал формоо анхны төлвөөс нээ.
5. Түр хадгалах утгуудад нэр, овог, имэйл, утас, төрсөн огноо орно. Нууц үг болон файлыг зөвхөн санах ойд байлга. Сүүлийн алхамд бүх формоо дахин шалгаж, алдаатай талбар байвал харгалзах алхмыг нээ.

**Шалгах.** Эхний алхмыг дуусгаад хуудсаа шинэчил. Хоёрдугаар алхам нээгдэж, Back дарахад өмнөх нэр, имэйл харагдана. Хөтчийн хадгалалтад нууц үг байх ёсгүй.

## 7. Зураг болон бүртгэлийг серверт хадгалах

Vercel дээр private Blob store бэлдэж, төслийн үндсэн хавтсанд `cp .env.example .env.local` ажиллуул. `BLOB_READ_WRITE_TOKEN`-д өөрийн токеныг тохируулаад хөгжүүлэлтийн серверээ дахин асаа. Токеныг зөвхөн сервер уншина.

| Endpoint | Юу хүлээн авах вэ? | Ямар үр дүн өгөх вэ? |
|---|---|---|
| POST /api/upload | FormData дотор file нэртэй зураг | Файлыг шалгаж, profile-images/<id> замд хадгална. Хариунд url талбартай JSON өгнө. |
| GET /api/profile-images/[id] | URL дахь зургийн ID | Хадгалсан зургийн байтыг тохирох Content-Type-тай буцаана. Энэ URL-ийг мэддэг хүн зургийг үзэж чадна. |
| POST /api/register | Нэр, овог, имэйл, утас, төрсөн огноо, өмнөх хүсэлтээр авсан зургийн URL | successSchema-аар шалгаад registrations/<id>.json замд хадгална. Амжилттай бол 201 буцаана. |

`src/lib/blob.ts`, `registrations.ts` дотор хадгалах үйлдлээ, route handler бүрд тухайн үйлдэлд тохирох алдааны хариуг бич. Дараа нь гурван route handler-аа холбо. `src/lib/registration-client.ts` дотор `uploadProfileImage` болон `saveProfile` функцийг зарла. Харин аль функцийг хэзээ дуудахыг `src/hooks/useRegistrationSubmission.ts` шийднэ. Эхлээд `uploadProfileImage(file)`-аас URL авч, дараа нь тэр URL-ийг `saveProfile(values, imageUrl)`-д дамжуул. JSON-д зөвшөөрсөн талбаруудыг нэрээр нь сонгож оруул. Энэ дасгалын нууц үгийг браузерт шалгадаг бөгөөд нэвтрэх эрх үүсгэхгүй.

Илгээж байхдаа давхар хүсэлтээс хамгаалж товчнуудаа идэвхгүй болго. Зураг амжилттай хадгалагдаад бүртгэл хадгалах хүсэлт алдаа өгвөл ижил файлтай дахин оролдохдоо өмнөх URL-ийг ашигла. Амжилттай үед түр бүртгэлээ устгаж, үр дүнгээ хадгалаад StepSuccess харуул.

**Дахин оролдох үйлдлийг шалгах.** Хөтчийн хөгжүүлэгчийн хэрэгслээр зөвхөн `/api/register` хүсэлтийг түр хориглоод формоо илгээ. Зураг амжилттай илгээгдсэн ч бүртгэл хадгалагдаагүй тул алдаа гарна. Хоригийг цуцлаад зургаа солилгүй дахин илгээ. Network хэсэгт хоёр дахь оролдлогоор зөвхөн register хүсэлт нэмэгдэх ёстой. Хэрэв upload дахин гарвал `useRegistrationSubmission` дотор өмнөх файл болон URL-ийг хадгалсан ref-ээ шалга.

## 8. Дэлгэцийг нэгтгэж, төслөө шалгах

`layout.tsx` дотор MotionProvider, Toaster-ийг холбо. `page.tsx` дотор толгой хэсэг, танилцуулга, RegisterForm, хөл хэсгийг байрлуул. Хуудасны өндөрт `h-dvh`, гол мөрөнд `minmax(0,1fr)` ашигла. Намхан дэлгэц дээр зөвхөн картын агуулга гүйлгэгдэж, сүүлийн товч хүрэх боломжтой байна.

| Турших үйлдэл | Хүлээх үр дүн |
|---|---|
| Хоосон форм дээр Continue дарах | Эхний алдаатай талбарт focus очиж, тайлбар харагдана. |
| Хоёр өөр нууц үг оруулах | Баталгаажуулах талбарын доор алдаа гарч, алхам шилжихгүй. |
| Өнөөдөр яг 13 нас хүрсэн болон маргааш 13 хүрэх огноогоор шалгах | Эхний огноог зөвшөөрч, хоёр дахь огноог сонгох эсвэл илгээхийг хориглоно. |
| PDF болон 5 MiB-аас том зураг сонгох | Зургийн алдаа гарч, бүртгэл амжилттай дуусахгүй. |
| Зөв мэдээлэл оруулж илгээх | Network хэсэгт эхлээд upload, дараа нь register хүсэлт харагдана. Нууц үг хүсэлтийн body-д орохгүй. |
| Амжилтын дэлгэц дээр refresh, дараа нь Start over дарах | Эхлээд хадгалсан үр дүн сэргэж, Start over дарахад хоосон эхний алхам нээгдэнэ. |
| Гар утасны өргөнд алдаа харуулаад Tab-аар шилжих | Талбар, алдаа, товч бүрд хүрч чадна. Хуудас бүхлээрээ босоо гүйлгэгдэхгүй. |

Терминалд `npm run typecheck`, `npm run lint`, `npm run build` ажиллуул. Төрлийн алдаа гарвал эхлээд талбарын нэр схемтэйгээ таарч байгаа эсэхийг шалга. Зураг сонгосон ч сервер алдаа өгвөл Network хэсгээс аль хүсэлт унасныг олж, тухайн хариуны error утгыг унш.

### Өгөгдөл ба хадгалалт

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

<details>
<summary><code>src/lib/utils.ts</code></summary>

```ts
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
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

### Суурь компонентууд

<details>
<summary><code>src/components/ui/Button.tsx</code></summary>

```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
export const buttonVariants = cva(
  "inline-flex cursor-pointer disabled:cursor-wait items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-emerald-700 text-white shadow-sm hover:bg-emerald-700/90",
        outline:
          "border border-slate-200 border-slate-400 bg-green-50 hover:bg-emerald-100",
        ghost: "hover:bg-emerald-100",
        link: "text-emerald-700 underline-offset-4 hover:underline",
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
<summary><code>src/components/ui/Calendar.tsx</code></summary>

```tsx
"use client";
import { DayPicker } from "react-day-picker";
import { CalendarDayButton } from "./CalendarDayButton";
import { CalendarOption } from "./CalendarOption";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
type CalendarType = ComponentProps<typeof DayPicker>;
export const Calendar = ({
  className,
  classNames,
  components,
  showOutsideDays = true,
  ...props
}: CalendarType) => (
  <DayPicker
    showOutsideDays={showOutsideDays}
    navLayout="after"
    components={{ DayButton: CalendarDayButton, Option: CalendarOption, ...components }}
    className={cn("relative p-3 text-sm", className)}
    classNames={{
      months: "relative flex flex-col gap-4 sm:flex-row",
      month: "space-y-3",
      month_caption: "relative flex h-9 items-center justify-center px-9",
      caption_label: "flex items-center gap-1 text-sm font-medium",
      dropdowns: "flex items-center gap-2",
      dropdown_root:
        "relative rounded-md px-1 focus-within:ring-2 focus-within:ring-emerald-700",
      dropdown:
        "absolute inset-0 w-full cursor-pointer opacity-0",
      nav: "absolute inset-x-0 top-0 flex justify-between",
      button_previous:
        "z-10 grid cursor-pointer disabled:cursor-wait size-9 place-items-center rounded-md hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 disabled:opacity-30",
      button_next:
        "z-10 grid cursor-pointer disabled:cursor-wait size-9 place-items-center rounded-md hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 disabled:opacity-30",
      chevron: "size-4 fill-current",
      month_grid: "w-full border-collapse",
      weekday:
        "h-8 w-9 text-center text-xs font-normal text-slate-600",
      day: "size-9 p-0 text-center",
      day_button:
        "grid cursor-pointer disabled:cursor-wait size-9 place-items-center rounded-md text-xs hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700",
      today: "font-bold",
      outside: "text-slate-600 opacity-40",
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
<summary><code>src/components/ui/CalendarDayButton.tsx</code></summary>

```tsx
import { DayButton, type DayButtonProps } from "react-day-picker";
import { cn } from "@/lib/utils";

export const CalendarDayButton = ({ modifiers, className, ...props }: DayButtonProps) => (
  <DayButton
    {...props}
    modifiers={modifiers}
    className={cn(
      className,
      modifiers.selected && "bg-emerald-700 text-white",
      modifiers.today && "ring-1 ring-emerald-700/40",
    )}
  />
);
```

</details>

<details>
<summary><code>src/components/ui/CalendarOption.tsx</code></summary>

```tsx
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const CalendarOption = ({ className, ...props }: ComponentProps<"option">) => (
  <option {...props} className={cn("bg-white text-emerald-950", className)} />
);
```

</details>

<details>
<summary><code>src/components/ui/Card.tsx</code></summary>

```tsx
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type CardType = ComponentProps<"div">;

export const Card = ({ className, ...props }: CardType) => {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white text-emerald-950 shadow-sm",
        className,
      )}
      {...props}
    />
  );
};
```

</details>

<details>
<summary><code>src/components/ui/CardContent.tsx</code></summary>

```tsx
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type CardContentType = ComponentProps<"div">;

export const CardContent = ({ className, ...props }: CardContentType) => {
  return <div className={cn("p-6", className)} {...props} />;
};
```

</details>







<details>
<summary><code>src/components/ui/Input.tsx</code></summary>

```tsx
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
type InputType = ComponentProps<"input">;
export const Input = ({ className, type, ...props }: InputType) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-lg border border-slate-200 border-slate-400 bg-green-50/60 px-3 py-2 text-sm shadow-xs placeholder:text-slate-600/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700/40 focus-visible:border-emerald-700 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
};
```

</details>

<details>
<summary><code>src/components/ui/Label.tsx</code></summary>

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
<summary><code>src/components/ui/MotionPanel.tsx</code></summary>

```tsx
"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

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
```

</details>

<details>
<summary><code>src/components/ui/Popover.tsx</code></summary>

```tsx
"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";

export const Popover = PopoverPrimitive.Root;
```

</details>

<details>
<summary><code>src/components/ui/PopoverContent.tsx</code></summary>

```tsx
"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

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
          "z-50 max-w-screen overflow-x-auto rounded-xl border border-slate-200 bg-white p-4 text-emerald-950 shadow-lg outline-none",
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
<summary><code>src/components/ui/PopoverTrigger.tsx</code></summary>

```tsx
"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";

export const PopoverTrigger = PopoverPrimitive.Trigger;
```

</details>

<details>
<summary><code>src/components/ui/Progress.tsx</code></summary>

```tsx
"use client";
import { motion } from "framer-motion";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ProgressType = Omit<ComponentProps<"div">, "children"> & {
  value?: number | null;
  max?: number;
};

export const Progress = ({ className, value = 0, max = 100, ...props }: ProgressType) => {
  const maximum = Number.isFinite(max) && max > 0 ? max : 100;
  const current = typeof value === "number" && Number.isFinite(value) ? Math.min(maximum, Math.max(0, value)) : 0;

  return (
    <div
      {...props}
      data-state={current === maximum ? "complete" : "loading"}
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-emerald-700/10", className)}
    >
      <motion.div
        className="h-full w-full flex-1 rounded-full bg-emerald-700 "
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
<summary><code>src/components/ui/Skeleton.tsx</code></summary>

```tsx
"use client";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
type SkeletonType = HTMLMotionProps<"div">;
export const Skeleton = ({ className, ...props }: SkeletonType) => {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={cn("rounded-lg bg-slate-100", className)}
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
<summary><code>src/components/ui/Sonner.tsx</code></summary>

```tsx
"use client";
import { Toaster as Sonner, type ToasterProps } from "sonner";
type ToasterType = ToasterProps;
export const Toaster = (props: ToasterType) => {
  return <Sonner {...props} theme="light" />;
};
```

</details>


### Custom hook-ууд

<details>
<summary><code>src/hooks/useImageUpload.ts</code></summary>

```ts
import { useEffect, useRef, useState } from "react";

export type ImageUploadOptions = {
  value?: File;
  disabled?: boolean;
  onChange: (file: File | undefined) => void;
  onBlur: () => void;
};

export const useImageUpload = ({ value, disabled, onChange, onBlur }: ImageUploadOptions) => {
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

  // eslint-disable-next-line react-hooks/set-state-in-effect
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

  return { preview, dragging, input, handleFileChange, openFilePicker, removeImage, handleDragOver, handleDragLeave, handleDrop };
};
```

</details>

<details>
<summary><code>src/hooks/useRegisterForm.ts</code></summary>

```ts
import { useEffect, useRef, useState } from "react";
import { useForm, type SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, draftSchema, successSchema, type RegisterValues } from "@/lib/validations/register.schema";
import { STORAGE_KEYS } from "@/lib/constants";
import { readStorage, writeStorage, removeStorage } from "@/lib/storage";
import { defaults, fields } from "@/components/register/form/register-config";
import { useRegistrationSubmission } from "./useRegistrationSubmission";

export const useRegisterForm = () => {
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: defaults,
  });
  const [step, setStep] = useState<FormStep>(1);
  const [hydrated, setHydrated] = useState(false);
  const [summary, setSummary] = useState<RegistrationSummary | null>(null);
  const [busy, setBusy] = useState(false);
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

  const completeRegistration = (result: RegistrationSummary) => {
    writeStorage(STORAGE_KEYS.success, result);
    removeStorage(STORAGE_KEYS.draft);
    setSummary(result);
    reset(defaults);
  };

  const { submit, error, setError, submissionStage } = useRegistrationSubmission(completeRegistration);

  const startOver = () => {
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

  return { form, step, hydrated, summary, error, busy, disabled, submissionStage, startOver, handleSubmit, handleBack };
};
```

</details>

<details>
<summary><code>src/hooks/useRegistrationSubmission.ts</code></summary>

```ts
import { useRef, useState } from "react";
import type { RegisterValues } from "@/lib/validations/register.schema";
import { toast } from "sonner";
import { saveProfile, uploadProfileImage } from "@/lib/registration-client";

type UploadedImageType = {
  file: File;
  result: UploadResult;
};

export const useRegistrationSubmission = (onSuccess: (summary: RegistrationSummary) => void) => {
  const saving = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const uploadedImage = useRef<UploadedImageType | null>(null);
  const [submissionStage, setSubmissionStage] = useState<"uploading" | "saving">("uploading");

  const submit = async (values: RegisterValues) => {
    if (saving.current) return;
    saving.current = true;
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
      onSuccess(safeSummary);
      uploadedImage.current = null;
      toast.success("Your profile is ready. Welcome!");
    } catch (cause) {
      const message = cause instanceof Error && cause.name !== "ZodError" ? cause.message : "Registration could not be completed. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      saving.current = false;
    }
  };

  return { submit, error, setError, submissionStage };
};
```

</details>

### Бүртгэлийн компонентууд

<details>
<summary><code>src/components/register/form/RegisterActions.tsx</code></summary>

```tsx
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, Loader2, LockKeyhole } from "lucide-react";

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
      <div className="flex gap-3 mt-4">
        {step > 1 && (
          <Button type="button" variant="outline" className="h-11" disabled={disabled} onClick={onBack}>
            <ArrowLeft className="shrink-0" size={15} />
            Back
          </Button>
        )}
        <Button type="submit" disabled={disabled} className="flex-1 text-xs font-semibold h-11">
          {disabled && <Loader2 className="size-4 animate-spin motion-reduce:animate-none" />}
          {label}
          {!disabled && <ArrowRight className="shrink-0 size-4" />}
        </Button>
      </div>
      <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-slate-600">
        <LockKeyhole size={11} />
        Progress is saved when you click Continue.
      </p>
    </>
  );
};
```

</details>

<details>
<summary><code>src/components/register/form/RegisterForm.tsx</code></summary>

```tsx
"use client";

import { AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { CardContent } from "@/components/ui/CardContent";
import { Stepper } from "../stepper/Stepper";
import { StepSuccess } from "../success/StepSuccess";
import { RegisterStep } from "../steps/RegisterStep";
import { RegisterActions } from "./RegisterActions";
import { RegisterSkeleton } from "./RegisterSkeleton";
import { useRegisterForm } from "@/hooks/useRegisterForm";

export const RegisterForm = () => {
  const { form, step, hydrated, summary, error, busy, disabled, submissionStage, startOver, handleSubmit, handleBack } = useRegisterForm();

  if (!hydrated) return <RegisterSkeleton />;

  return (
    <Card className="min-h-0 max-h-full overflow-y-auto overscroll-contain bg-white/90 shadow-xl shadow-emerald-950/10 backdrop-blur-xl">
      <CardContent className="p-4 sm:p-6">
        <Stepper step={summary ? 4 : step} />
        {summary ? (
          <StepSuccess data={summary} onReset={startOver} />
        ) : (
          <form noValidate onSubmit={handleSubmit}>
            <RegisterStep step={step} form={form} disabled={disabled} />
            {error && (
              <div

                className="flex gap-2 p-3 mt-5 text-xs border rounded-lg border-slate-200 border-rose-700/20 bg-rose-700/5 text-rose-700"
              >
                <AlertCircle className="size-4 shrink-0" />
                {error}
              </div>
            )}
            <RegisterActions step={step} busy={busy} submitting={form.formState.isSubmitting} submissionStage={submissionStage} onBack={handleBack} />
          </form>
        )}
      </CardContent>
    </Card>
  );
};
```

</details>

<details>
<summary><code>src/components/register/form/RegisterSkeleton.tsx</code></summary>

```tsx
import { Card } from "@/components/ui/Card";
import { CardContent } from "@/components/ui/CardContent";
import { Skeleton } from "@/components/ui/Skeleton";

export const RegisterSkeleton = () => (
  <Card className="min-h-0 max-h-full overflow-y-auto overscroll-contain bg-white/90 shadow-xl shadow-emerald-950/10 backdrop-blur-xl">
    <CardContent className="space-y-7 p-4 sm:p-6">
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
<summary><code>src/components/register/form/register-config.ts</code></summary>

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
<summary><code>src/components/register/input/DateOfBirthInput.tsx</code></summary>

```tsx
"use client";

import { useController } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover } from "@/components/ui/popover";
import { PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@/components/ui/popover";
import { latestBirthDate } from "@/lib/validations/register.schema";

export const DateOfBirthInput = ({ name, control }: RegistrationFieldProps<"dateOfBirth">) => {
  const { field: { ref: inputRef, value, onChange, onBlur }, fieldState } = useController({ name, control });
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
    <Field data-invalid={fieldState.invalid} className="gap-2">
      <FieldLabel htmlFor={name}>Date of birth</FieldLabel>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button id={name} ref={inputRef} type="button" variant="outline" className="h-11 w-full justify-start gap-3 rounded-lg border-input px-3.5 font-normal shadow-none">
            <CalendarIcon className="size-4 shrink-0 text-slate-600" />
            {value ? format(parseISO(value), "MMMM d, yyyy") : <span className="text-slate-600">Choose your birthday</span>}
          </Button>
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
      <FieldError id={`${name}-error`}>{fieldState.error?.message}</FieldError>
      <p className="text-xs text-slate-600">You must be 13 or older to join.</p>
    </Field>
  );
};
```

</details>

<details>
<summary><code>src/components/register/input/EmailInput.tsx</code></summary>

```tsx
"use client";

import { useController } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";

export const EmailInput = ({ name, control }: RegistrationFieldProps<"email">) => {
  const { field, fieldState } = useController({ name, control });
  return (
    <Field data-invalid={fieldState.invalid} className="gap-2">
      <FieldLabel htmlFor={field.name}>Email address</FieldLabel>
      <div className="relative">
        <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-600" />
        <Input id={field.name} {...field} type="email" autoComplete="email" placeholder="you@example.com" className="h-11 pl-10" />
      </div>
      <FieldError id={`${field.name}-error`}>{fieldState.error?.message}</FieldError>
      <p className="text-xs text-slate-600">A little connection starts with the right address.</p>
    </Field>
  );
};
```

</details>

<details>
<summary><code>src/components/register/input/ImageDropZone.tsx</code></summary>

```tsx
import type { ComponentProps } from "react";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

type ImageDropZoneProps = ComponentProps<"button"> & { dragging: boolean };

export const ImageDropZone = ({ dragging, ...props }: ImageDropZoneProps) => (
  <button
    {...props}
    type="button"
    className={cn(
      "flex w-full cursor-pointer disabled:cursor-wait flex-col items-center rounded-xl border border-slate-200 border-dashed bg-slate-100/25 px-4 py-6 text-center hover:border-emerald-700 hover:bg-emerald-700/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700",
      dragging && "border-emerald-700 bg-emerald-700/10",
    )}
  >
    <span className="grid mb-3 rounded-full size-9 place-items-center bg-emerald-700/10 text-emerald-700">
      <UploadCloud className="shrink-0" size={18} />
    </span>

    <span className="text-xs">
      <strong className="font-semibold text-emerald-700">Click to upload</strong> or drag and drop
    </span>
    <span className="mt-1 text-xs text-slate-600">JPG, PNG or WebP · Up to 5 MB</span>
  </button>
);
```

</details>

<details>
<summary><code>src/components/register/input/ImageUpload.tsx</code></summary>

```tsx
"use client";

import { IMAGE_TYPES } from "@/lib/constants";
import { ImageDropZone } from "./ImageDropZone";
import { ImageUploadPreview } from "./ImageUploadPreview";
import { useImageUpload, type ImageUploadOptions } from "@/hooks/useImageUpload";

type ImageUploadProps = ImageUploadOptions & { id?: string };

export const ImageUpload = ({ value, disabled = false, onChange, onBlur, ...buttonProps }: ImageUploadProps) => {
  const {
    input, preview, dragging, openFilePicker, removeImage,
    handleFileChange, handleDragOver, handleDragLeave, handleDrop,
  } = useImageUpload({ value, disabled, onChange, onBlur });

  return (
    <div>
      <input
        ref={input}
        type="file"
        disabled={disabled}
        accept={IMAGE_TYPES.join(",")}
        hidden
        onChange={handleFileChange}
      />
      {preview ? (
        <ImageUploadPreview
          {...buttonProps}
          preview={preview}
          filename={value?.name}
          disabled={disabled}
          onChoose={openFilePicker}
          onRemove={removeImage}
        />
      ) : (
        <ImageDropZone
          {...buttonProps}
          dragging={dragging}
          disabled={disabled}
          onClick={openFilePicker}
          onBlur={onBlur}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        />
      )}
    </div>
  );
};
```

</details>

<details>
<summary><code>src/components/register/input/ImageUploadPreview.tsx</code></summary>

```tsx
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";

type ImageUploadPreviewProps = {
  preview: string;
  filename?: string;
  id?: string;
  disabled?: boolean;
  onChoose: () => void;
  onRemove: () => void;
};

export const ImageUploadPreview = ({ preview, filename, onChoose, onRemove, ...buttonProps }: ImageUploadPreviewProps) => (
  <div className="flex items-center gap-4 p-4 border rounded-xl border-slate-200 bg-slate-100/30">
    <Image unoptimized width={64} height={64} src={preview} alt="Selected profile preview" className="object-cover rounded-full size-16" />
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium truncate">{filename}</p>
      <Button {...buttonProps} type="button" variant="link" className="h-auto p-0 text-xs" onClick={onChoose}>
        Choose another photo
      </Button>
    </div>
    <Button type="button" size="icon" variant="ghost" disabled={buttonProps.disabled} title="Remove photo" onClick={onRemove}>
      <X className="shrink-0" size={16} />
    </Button>
  </div>
);
```

</details>

<details>
<summary><code>src/components/register/input/NameInput.tsx</code></summary>

```tsx
"use client";

import { useController } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import { User } from "lucide-react";
import { Input } from "@/components/ui/input";

export const NameInput = ({ name, control }: RegistrationFieldProps<"firstName" | "lastName">) => {
  const { field, fieldState } = useController({ name, control });
  const isFirstName = field.name === "firstName";
  return (
    <Field data-invalid={fieldState.invalid} className="gap-2">
      <FieldLabel htmlFor={field.name}>{isFirstName ? "First name" : "Last name"}</FieldLabel>
      <div className="relative">
        <User className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-600" />
        <Input id={field.name}
          {...field}
          autoComplete={isFirstName ? "given-name" : "family-name"}
          placeholder={isFirstName ? "e.g. Alex" : "e.g. Morgan"}
          className="h-11 pl-10"
        />
      </div>
      <FieldError id={`${field.name}-error`}>{fieldState.error?.message}</FieldError>
    </Field>
  );
};
```

</details>

<details>
<summary><code>src/components/register/input/PasswordInput.tsx</code></summary>

```tsx
"use client";

import { useController } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const invertVisibility = (previous: boolean) => !previous;

export const PasswordInput = ({ name, control }: RegistrationFieldProps<"password" | "confirmPassword">) => {
  const { field, fieldState } = useController({ name, control });
  const [visible, setVisible] = useState(false);
  const isPassword = field.name === "password";
  const handleTogglePassword = () => setVisible(invertVisibility);

  return (
    <Field data-invalid={fieldState.invalid} className="gap-2">
      <FieldLabel htmlFor={field.name}>{isPassword ? "Password" : "Confirm password"}</FieldLabel>
      <div className="relative">
        <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-600" />
        <Input id={field.name}
          {...field}
          type={visible ? "text" : "password"}
          autoComplete="new-password"
          className="h-11 px-10"
          placeholder={isPassword ? "Create a strong password" : "Enter your password again"}
        />
        <Button type="button" variant="ghost" size="icon" title={visible ? "Hide password" : "Show password"} className="absolute top-1/2 right-1 size-9 -translate-y-1/2" onClick={handleTogglePassword}>
          {visible ? <EyeOff className="shrink-0" size={16} /> : <Eye className="shrink-0" size={16} />}
        </Button>
      </div>
      <FieldError id={`${field.name}-error`}>{fieldState.error?.message}</FieldError>
    </Field>
  );
};
```

</details>

<details>
<summary><code>src/components/register/input/PhoneNumberInput.tsx</code></summary>

```tsx
"use client";

import { useController } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import { Phone } from "lucide-react";
import { Input } from "@/components/ui/input";

export const PhoneNumberInput = ({ name, control }: RegistrationFieldProps<"phoneNumber">) => {
  const { field, fieldState } = useController({ name, control });
  return (
    <Field data-invalid={fieldState.invalid} className="gap-2">
      <FieldLabel htmlFor={field.name}>Phone number</FieldLabel>
      <div className="relative">
        <Phone className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-600" />
        <Input id={field.name} {...field} type="tel" autoComplete="tel" placeholder="+97699112233" className="h-11 pl-10" />
      </div>
      <FieldError id={`${field.name}-error`}>{fieldState.error?.message}</FieldError>
    </Field>
  );
};
```

</details>

<details>
<summary><code>src/components/register/input/ProfileImageInput.tsx</code></summary>

```tsx
"use client";

import { useController } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

import { ImageUpload } from "./ImageUpload";

export const ProfileImageInput = ({ name, control }: RegistrationFieldProps<"profileImage">) => {
  const { field, fieldState, formState } = useController({ name, control });
  return (
    <Field data-invalid={fieldState.invalid} className="gap-2">
      <FieldLabel htmlFor={field.name}>Profile photo</FieldLabel>
      <ImageUpload id={field.name} value={field.value} disabled={formState.isSubmitting} onChange={field.onChange} onBlur={field.onBlur} />
      <FieldError id={`${field.name}-error`}>{fieldState.error?.message}</FieldError>
    </Field>
  );
};
```

</details>


<details>
<summary><code>src/components/register/stepper/Stepper.tsx</code></summary>

```tsx
"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { STEPS } from "@/lib/constants";
import { Check, User, Lock, Camera } from "lucide-react";

const icons = [User, Lock, Camera];

type StepperType = {
  step: number;
};

export const Stepper = ({ step }: StepperType) => {
  const renderConnector = (label: string, index: number) => (
    <span
      key={label}
      className={cn(
        "flex-1 origin-left bg-emerald-700 transition-transform duration-300 motion-reduce:transition-none",
        step > index + 1 ? "scale-x-100" : "scale-x-0",
      )}
    />
  );

  const renderStep = (label: string, index: number) => {
    const number = index + 1;
    const Icon = icons[index];

    return (
      <li key={label} className="flex flex-col items-center gap-2.5 first:items-start last:items-end">
        <motion.span
          initial={false}
          animate={{ scale: step === number ? 1.08 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className={cn(
            "relative z-10 grid size-8 place-items-center rounded-full border border-slate-200 text-xs font-semibold ",
            step >= number ? "border-emerald-700 bg-emerald-700 text-white shadow-sm" : "border-slate-200 bg-white text-slate-600",
          )}
        >
          {step > number ? <Check size={15} /> : number}
        </motion.span>
        <span className={cn("flex items-center gap-1.5 text-xs", step === number ? "font-semibold text-emerald-950" : "text-slate-600")}>
          <Icon size={12} />
          {label}
        </span>
      </li>
    );
  };

  return (
    <nav className="relative mb-6">
      <div className="absolute inset-x-4 top-4 flex h-0.5 bg-slate-200">
        {STEPS.slice(1).map(renderConnector)}
      </div>
      <ol className="grid grid-cols-3">{STEPS.map(renderStep)}</ol>
    </nav>
  );
};
```

</details>

<details>
<summary><code>src/components/register/steps/RegisterStep.tsx</code></summary>

```tsx
import type { UseFormReturn } from "react-hook-form";
import type { RegisterValues } from "@/lib/validations/register.schema";
import { MotionPanel } from "@/components/ui/MotionPanel";
import { copy } from "../form/register-config";
import { StepPersonal } from "./StepPersonal";
import { StepSecurity } from "./StepSecurity";
import { StepProfile } from "./StepProfile";

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
      <MotionPanel key={`heading-${step}`} className="mb-4">
        <p className="mb-2 text-xs font-semibold tracking-widest text-emerald-700 uppercase">Step {step} of 3</p>
        <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-2 text-xs leading-5 text-slate-600">{description}</p>
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
<summary><code>src/components/register/steps/StepPersonal.tsx</code></summary>

```tsx
"use client";

import type { UseFormReturn } from "react-hook-form";
import type { RegisterValues } from "@/lib/validations/register.schema";
import { NameInput } from "../input/NameInput";
import { EmailInput } from "../input/EmailInput";

type StepPersonalType = { form: UseFormReturn<RegisterValues> };

export const StepPersonal = ({ form }: StepPersonalType) => (
  <div className="space-y-5">
    <div className="grid gap-5 sm:grid-cols-2">
      <NameInput control={form.control} name="firstName" />
      <NameInput control={form.control} name="lastName" />
    </div>
    <EmailInput control={form.control} name="email" />
  </div>
);
```

</details>

<details>
<summary><code>src/components/register/steps/StepProfile.tsx</code></summary>

```tsx
"use client";

import { type UseFormReturn } from "react-hook-form";
import { type RegisterValues } from "@/lib/validations/register.schema";
import { PhoneNumberInput } from "../input/PhoneNumberInput";
import { DateOfBirthInput } from "../input/DateOfBirthInput";
import { ProfileImageInput } from "../input/ProfileImageInput";

type StepProfileType = {
  form: UseFormReturn<RegisterValues>;
};

export const StepProfile = ({ form }: StepProfileType) => {
  return (
    <div className="space-y-5">
      <PhoneNumberInput control={form.control} name="phoneNumber" />
      <DateOfBirthInput control={form.control} name="dateOfBirth" />
      <ProfileImageInput control={form.control} name="profileImage" />
    </div>
  );
};
```

</details>

<details>
<summary><code>src/components/register/steps/StepSecurity.tsx</code></summary>

```tsx
"use client";

import type { UseFormReturn } from "react-hook-form";
import type { RegisterValues } from "@/lib/validations/register.schema";
import { PasswordInput } from "../input/PasswordInput";

type StepSecurityType = { form: UseFormReturn<RegisterValues> };

export const StepSecurity = ({ form }: StepSecurityType) => (
  <div className="space-y-5">
    <PasswordInput control={form.control} name="password" />
    <PasswordInput control={form.control} name="confirmPassword" />
  </div>
);
```

</details>

<details>
<summary><code>src/components/register/success/StepSuccess.tsx</code></summary>

```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { CheckCircle2, ArrowRight, Mail, Phone, Calendar, User } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/Button";
import { SummaryRow } from "./SummaryRow";

type StepSuccessType = {
  data: RegistrationSummary;
  onReset: () => void;
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
          className="object-cover border-4 rounded-full shadow-lg size-24 border-green-50"
        />
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
          className="absolute bottom-0 right-0"
        >
          <CheckCircle2 className="rounded-full size-8 bg-white text-emerald-700" />
        </motion.span>
      </div>
      <p className="mb-2 text-xs font-semibold tracking-widest uppercase text-emerald-700">You’re all set</p>
      <h2 ref={heading} tabIndex={-1} className="text-3xl font-semibold tracking-tight">
        Welcome, {data.firstName}.
      </h2>
      <p className="mt-3 text-sm text-slate-600">Your profile is ready for its next chapter.</p>
      <dl className="px-4 text-left border divide-y my-7 rounded-xl border-slate-200 bg-slate-100/25">
        <SummaryRow icon={User} label="Name" value={`${data.firstName} ${data.lastName}`} />
        <SummaryRow icon={Mail} label="Email" value={data.email} />
        <SummaryRow icon={Phone} label="Phone" value={data.phoneNumber} />
        <SummaryRow icon={Calendar} label="Birthday" value={format(parseISO(data.dateOfBirth), "MMMM d, yyyy")} />
      </dl>
      <Button onClick={onReset} className="w-full h-11">
        Start over
        <ArrowRight className="shrink-0" size={16} />
      </Button>
    </motion.section>
  );
};
```

</details>

<details>
<summary><code>src/components/register/success/SummaryRow.tsx</code></summary>

```tsx
"use client";

import type { LucideIcon } from "lucide-react";

type SummaryRowType = {
  label: string;
  value: string;
  icon: LucideIcon;
};

export const SummaryRow = ({ icon: Icon, label, value }: SummaryRowType) => {
  return (
    <div className="flex items-center gap-3 py-3">
      <Icon className="size-4 shrink-0 text-slate-600" />
      <div className="min-w-0">
        <dt className="text-xs text-slate-600">{label}</dt>
        <dd className="text-sm wrap-break-word">{value}</dd>
      </div>
    </div>
  );
};
```

</details>

### Хуудас ба API

<details>
<summary><code>src/components/MotionProvider.tsx</code></summary>

```tsx
"use client";

import { MotionConfig } from "framer-motion";
import type { PropsWithChildren } from "react";

export const MotionProvider = ({ children }: PropsWithChildren) => {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
};
```

</details>

<details>
<summary><code>src/app/api/profile-images/[id]/route.ts</code></summary>

```ts
import { get } from "@vercel/blob";
import { z } from "zod";

export const GET = async (_request: Request, context: RouteContext<"/api/profile-images/[id]">) => {
  const { id } = await context.params;
  if (!z.uuid().safeParse(id).success) return new Response(null, { status: 404 });
  const image = await get(`profile-images/${id}`, { access: "private" });
  if (!image || image.statusCode !== 200) return new Response(null, { status: 404 });
  return new Response(image.stream, { headers: {
    "Content-Type": image.blob.contentType,
    "Cache-Control": "private, no-store",
    "X-Content-Type-Options": "nosniff",
  } });
};
```

</details>

<details>
<summary><code>src/app/api/register/route.ts</code></summary>

```ts
import { NextResponse } from "next/server";
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
  } catch {
    return errorResponse("Registration could not be saved. Please try again.", 500);
  }
};
```

</details>

<details>
<summary><code>src/app/api/upload/route.ts</code></summary>

```ts
import { NextResponse } from "next/server";
import { uploadImage } from "@/lib/blob";
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
  } catch {
    return NextResponse.json<ApiError>({ error: "Image upload failed. Please try again." }, { status: 500 });
  }
};
```

</details>

<details>
<summary><code>src/app/error.tsx</code></summary>

```tsx
"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

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
        <AlertCircle className="mx-auto size-10 text-rose-700" />
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="text-slate-600">Your saved progress is still on this device. Try opening the form again.</p>
        <Button onClick={reset}>Try again</Button>
      </section>
    </main>
  );
};
export default ErrorBoundary;
```

</details>

<details>
<summary><code>src/app/globals.css</code></summary>

```css
@import "tailwindcss";
@config "../../tailwind.config.ts";
```

</details>

<details>
<summary><code>src/app/icon.svg</code></summary>

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><style>.fill-emerald-700{fill:oklch(50.8% 0.118 165.612)}.stroke-white{stroke:white}</style><rect width="64" height="64" rx="20" class="fill-emerald-700"/><g class="stroke-white" stroke-width="5" stroke-linecap="round"><path d="M32 15v34M17 23l30 18M17 41l30-18"/></g></svg>
```

</details>

<details>
<summary><code>src/app/layout.tsx</code></summary>

```tsx
import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/Sonner";
import { MotionProvider } from "@/components/MotionProvider";

export const metadata: Metadata = {
  title: "Firstleaf",
  description: "Create your profile in three simple steps.",
};

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <html lang="en">
      <body className="m-0 bg-green-50 font-sans text-emerald-950 antialiased scheme-light">
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
import { RegisterForm } from "@/components/register/form/RegisterForm";

const Home = () => {
  return (
    <div className="flex h-dvh flex-col overflow-clip px-4 sm:px-10">
      <header className="flex items-center justify-between h-12 shrink-0 w-full mx-auto max-w-7xl lg:h-16">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <span className="grid rounded-full size-8 place-items-center bg-emerald-700 text-white">
            <Asterisk size={25} />
          </span>
          Firstleaf
        </Link>
      </header>

      <main className="mx-auto grid min-h-0 w-full max-w-xl flex-1 grid-rows-1 items-center py-2 lg:max-w-6xl lg:grid-cols-2 lg:gap-16">
        <section className="relative hidden lg:block max-h-full overflow-y-auto">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 border-emerald-700/15 bg-emerald-700/5 px-3 py-1.5 text-xs font-semibold tracking-widest text-emerald-700">
            <span className="size-1.5 rounded-full bg-emerald-700" /> A FRESH START, MADE SIMPLE
          </div>
          <h1 className="max-w-lg text-5xl leading-none font-semibold tracking-tighter sm:text-6xl">
            Big possibilities.
            <br />A little more <span className="font-serif italic font-normal text-emerald-700">you.</span>
          </h1>
          <p className="max-w-sm mt-6 text-base leading-7 text-slate-600">
            Good things start with a hello. Create your profile and make space for what’s next.
          </p>
          <div className="flex items-center gap-3 mt-10 text-xs text-slate-600">
            <ShieldCheck className="size-5 text-emerald-700" />
            <span>Your details. Your control. Always.</span>
          </div>
        </section>

        <RegisterForm />
      </main>

      <footer className="mx-auto hidden w-full shrink-0 lg:flex max-w-7xl flex-wrap justify-between gap-3 border-t border-slate-200 py-2 text-xs text-slate-600">
        <span>© {new Date().getFullYear()} Firstleaf.</span>
        <span>Thoughtfully simple. Uniquely you.</span>
      </footer>
    </div>
  );
};

export default Home;
```

</details>
