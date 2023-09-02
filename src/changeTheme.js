import { updateTheme } from "tailwind-material-colors/lib/updateTheme.esm";

export default function changeTheme(color) {
  updateTheme(
    {
      primary: color,
    },
    "class"
  );
}
