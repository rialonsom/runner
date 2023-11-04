type ShoeInput = {
  brand: string;
  name: string;
  startDate: Date;
  hasEndDate: boolean;
  endDate: Date;
  lifespan: string;
};

export function validateShoeInput(shoeInput: ShoeInput): {
  valid: boolean;
  errors: string[];
} {
  const { brand, name, startDate, hasEndDate, endDate, lifespan } = shoeInput;

  let errors: string[] = [];
  if (brand.length <= 0) {
    errors.push("- Brand can't be empty.");
  }
  if (name.length <= 0) {
    errors.push("- Brand can't be empty.");
  }
  if (hasEndDate && endDate.getTime() - startDate.getTime() <= 0) {
    errors.push('- Start date should be earlier than End date.');
  }
  if (Number.isNaN(parseInt(lifespan, 10)) || parseInt(lifespan, 10) < 0) {
    errors.push("- Lifespan can't be empty.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
