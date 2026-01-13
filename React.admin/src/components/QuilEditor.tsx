'use client'

import React, { ComponentProps, useRef } from "react";
import ReactQuill, { Quill } from 'react-quill-new';
import "react-quill-new/dist/quill.snow.css";
import { styled } from "@mui/material/styles";
import { Control, Controller, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { FormHelperText, InputLabel, Typography } from "@mui/material";

// FONT
const FontAttributor = Quill.import('formats/font') as any;
FontAttributor.whitelist = ['sans-serif', 'serif', 'monospace'];
Quill.register(FontAttributor, true);

// SIZE
const SizeStyle = Quill.import('attributors/style/size') as any;
SizeStyle.whitelist = ['small', 'normal', 'large', 'huge'];
Quill.register(SizeStyle, true);

const ColorStyle = Quill.import('attributors/style/color') as any;
Quill.register(ColorStyle, true);


// SCRIPT (already fine)
const Script = Quill.import('formats/script') as any;
Quill.register(Script, true);

// Case 1: react-hook-form controlled
interface RHFEditorProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  rules?: RegisterOptions<T>;
}
// Case 2: standalone controlled
interface StandaloneEditorProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  error?: boolean;
  helperText?: string;
}

type TiptapProps<T extends FieldValues = FieldValues> =
  | RHFEditorProps<T>
  | StandaloneEditorProps;

type ReactQuillNewProps = ComponentProps<typeof ReactQuill>;

const ForwardedQuill = React.forwardRef<ReactQuill, ReactQuillNewProps>((props, ref) => (
  <ReactQuill ref={ref} {...props} />
));
ForwardedQuill.displayName = "ForwardedQuill";

const StyledQuill = styled(ForwardedQuill)(({ theme }) => ({
  "& .ql-toolbar": {
    borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
    background: theme.palette.action.hover,
  },
  "& .ql-container": {
    borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.body1.fontSize,
  },
  "& .ql-editor": {
    minHeight: "120px",
    padding: theme.spacing(2),
  },
  "&:hover:not(.error) .ql-toolbar, &:hover:not(.error) .ql-container": {
    borderColor: `${theme.palette.grey[600]}`,
  },
  "&.error .ql-toolbar, &.error .ql-container": {
    borderColor: theme.palette.error.main,
  },
  "&:not(.error) .ql-toolbar, &:not(.error) .ql-container": {
    borderColor: `${theme.palette.grey[300]}`,
  },
  "& .ql-editor.ql-blank::before": {
    fontStyle: "normal"
  }
}));

export function QuilEditor<T extends FieldValues = FieldValues>(props: TiptapProps<T>) {
  const quillRef = useRef<ReactQuill | null>(null);
  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'script',
    'blockquote', 'list', 'indent', 'link', 'image',
    'color', 'align', 'direction', 'font', 'size'
  ];

  function imageHandler() {
    const editor = quillRef.current?.getEditor();
    console.log(editor);
    if (!editor) return;
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('image', file);

      try {
        const data = { url: await fileReader(file) };
        const range = editor.getSelection();
        if(range) editor.insertEmbed(range.index, 'image', data.url);
      } catch (err) {
        console.error('Upload failed', err);
      }
    };
  }

  function fileReader(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline'],
        [{ script: 'sub' }, { script: 'super' }],
        [{ font: [] }, { size: [] }, { color: [] }],
        ['blockquote', { align: [] }, { direction: 'rtl' }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['image', 'link'],
        ['clean'],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  };

  const isRHF = "control" in props && "name" in props;
  if (isRHF) {
    const { name, control, placeholder, label, rules } = props;
    return (
      <>
        {label && <InputLabel>{label}</InputLabel>}
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field, fieldState }) => (
            <>
              <StyledQuill
                ref={quillRef}
                placeholder={placeholder ?? "Compose an epic..."}
                value={field.value || ""}
                onChange={field.onChange}
                onBlur={field.onBlur} modules={modules} formats={formats}
                className={fieldState.error ? "error" : ""}>
              </StyledQuill>
              {fieldState.error && (
                <FormHelperText error>{fieldState.error.message}</FormHelperText>
              )}
            </>
          )}
        />
      </>
    );
  }

  // Standalone usage
  const { value, onChange, label, error, helperText } = props;
  return (
    <>
      {label && <Typography variant="body1">{label}</Typography>}
      <StyledQuill className={error ? "error" : ""} placeholder="Compose an epic..." value={value || ""} onChange={onChange} modules={modules} ref={quillRef} formats={formats}></StyledQuill>
      {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </>
  );
}
