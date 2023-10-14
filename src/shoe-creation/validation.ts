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
  switch (true) {
    case brand.length <= 0:
      errors.push("- Brand can't be empty.");
    // falls through
    case name.length <= 0:
      errors.push("- Name can't be empty.");
    // falls through
    case hasEndDate && endDate.getTime() - startDate.getTime() <= 0:
      errors.push('- Start date should be earlier than End date.');
    // falls through
    case Number.isNaN(parseInt(lifespan, 10)) || parseInt(lifespan, 10) < 0:
      errors.push("- Lifespan can't be empty.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
