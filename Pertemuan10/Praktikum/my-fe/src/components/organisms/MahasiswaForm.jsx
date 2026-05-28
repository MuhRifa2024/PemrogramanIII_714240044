import Button from "../atoms/Button";
import SelectInput from "../atoms/SelectInput";
import TextInput from "../atoms/TextInput";
import FormField from "../molecules/FormField";

export const PRODI_OPTIONS = [
  "S2 Manajemen Logistik",
  "S1 Manajemen Logistik",
  "S1 Manajemen Rekayasa",
  "S1 Manajemen Transportasi",
  "S1 Bisnis Digital",
  "S1 Sains Data",
  "D4 Akuntansi",
  "D4 Teknik Informatika",
  "D4 Logistik Bisnis",
  "D4 Akuntansi Keuangan",
  "D4 Manajemen Perusahaan",
  "D3 Administrasi Logistik",
  "D3 Manajemen Pemasaran",
  "D3 Teknik Informatika",
];

export default function MahasiswaForm({
  form,
  errors,
  onChange,
  onSubmit,
  onCancel,
  submitLabel,
  disableNpm,
  isSubmitting,
}) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "npm") {
      onChange(name, value.replace(/\D/g, ""));
      return;
    }
    onChange(name, value);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="NPM" htmlFor="npm" error={errors?.npm}>
          <TextInput
            id="npm"
            name="npm"
            inputMode="numeric"
            pattern="\d*"
            value={form.npm}
            onChange={handleChange}
            placeholder="Masukkan NPM"
            disabled={disableNpm}
          />
        </FormField>

        <FormField label="Nama" htmlFor="nama" error={errors?.nama}>
          <TextInput
            id="nama"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            placeholder="Masukkan nama"
          />
        </FormField>

        <FormField label="Prodi" htmlFor="prodi" error={errors?.prodi}>
          <SelectInput
            id="prodi"
            name="prodi"
            value={form.prodi}
            onChange={handleChange}
          >
            <option value="">Pilih prodi</option>
            {PRODI_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectInput>
        </FormField>

        <FormField label="Email" htmlFor="email" error={errors?.email}>
          <TextInput
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="nama@email.com"
          />
        </FormField>
      </div>

      <FormField label="Alamat" htmlFor="alamat" error={errors?.alamat}>
        <TextInput
          id="alamat"
          name="alamat"
          value={form.alamat}
          onChange={handleChange}
          placeholder="Masukkan alamat lengkap"
        />
      </FormField>

      <div className="flex flex-wrap justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Kembali
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Menyimpan..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}