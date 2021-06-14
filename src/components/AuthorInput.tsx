import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

type AuthorInputProps = {
  index: number;
  changeHandler: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
};

function AuthorInput({ index, changeHandler }: AuthorInputProps) {
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="author">Author</InputLabel>
      <Input id={"" + index} name="author" onChange={changeHandler} />
    </FormControl>
  );
}

export default AuthorInput;
