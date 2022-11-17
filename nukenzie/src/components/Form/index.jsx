import "./styles.css";
import { InputText, InputValue } from "../Input";
import { ButtonPrimary } from "../Button";
import { Select } from "../Select";

function getFormData(form, registers) {
  const formElements = form.querySelectorAll("input, [data-selected]");
  
  const lastRegisterId = registers[registers.length - 1] ? registers[registers.length].id : 0;
  let data = {id: lastRegisterId + 1};

  formElements.forEach((formElement) => {
    if (formElement.tagName == "INPUT") {
      data = {
        ...data,
        [formElement.name]: formElement.value,
      };
    } else {
      data = {
        ...data,
        type: formElement.getAttribute("data-selected"),
      };
    }
  });

  return data;
}

function setFilteredRegistersList(
  filteredRegisters,
  setFilteredRegisters,
  data
) {
  const hasFilteredtype = filteredRegisters.every((register) => {
    return register.type == data.type;
  });

  const isFilteredByAll = filteredRegisters.some((register) => {
    return register.type == data.type;
  });

  if (hasFilteredtype || isFilteredByAll) {
    setFilteredRegisters([...filteredRegisters, data]);
  }
}

export default function Form({
  registers,
  setRegisters,
  filteredRegisters,
  setFilteredRegisters,
}) {
  return (
    <form
      className="form"
      onSubmit={(event) => {
        event.preventDefault();

        const form = event.target;

        const data = getFormData(form, registers);

        const dataIsNotEmpty = Object.values(data).every(
          (value) => value != ""
        );

        if (dataIsNotEmpty) {
          setRegisters([...registers, data]);

          setFilteredRegistersList(
            filteredRegisters,
            setFilteredRegisters,
            data
          );
        } else {
          // toastfy
        }
      }}
    >
      <InputText
        name="description"
        placeholder="Digite aqui sua descrição"
        label="Descrição"
        info="Ex: Compra de roupas"
      />
      <div className="input-group">
        <InputValue name="value" label="Valor" />
        <Select options={["Entrada", "Despesa"]} label="Tipo de valor" />
      </div>
      <ButtonPrimary text="Inserir valor" />
    </form>
  );
}
