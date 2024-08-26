import { column, defineDb, defineTable } from 'astro:db';


const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    uid: column.text(),
    email: column.text(),
    password: column.text(),
    displayName: column.text(),
    tShirtSize: column.text(),
    alkoholikDrink: column.text({ references: () => AlcoholicDrink.columns.id }),
    softDrink: column.text( { references: () => NonAlcoholicDrink.columns.id }),
    clubId: column.text({ references: () => Club.columns.id }),
  }
});


const Club = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    foundationDate: column.number(),
    adminId: column.text(),
  }
});

const Drink = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    type: column.text(),
    clubId: column.text({ references: () => Club.columns.id }),
  }
});

const AlcoholicDrink = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    unitsPerPack: column.number(),
    price: column.number(),
    stock: column.number(),
  }
});

const NonAlcoholicDrink = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    unitsPerPack: column.number(),
    price: column.number(),
    stock: column.number(),
  }
});

const Fee = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    description: column.text(),
    amount: column.number(),
    dueDate: column.date(),
  }
});

const Payment = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    paymentDate: column.date(),
    amount: column.number(),
  }
});

const Expense = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    description: column.text(),
    amount: column.number(),
    date: column.date(),
    invoiceId: column.text({ references: () => Invoice.columns.id }),
  }
});

const Income = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    description: column.text(),
    amount: column.number(),
    date: column.date(),
    invoiceId: column.text({ references: () => Invoice.columns.id }),
  }
});

const Invoice = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    sellerName: column.text(),
    price: column.number(),
    date: column.date(),
  }
});

const Event = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    title: column.text(),
    description: column.text(),
    eventDateTime: column.date(),
    imageUrls: column.json(),
    clubId: column.text({ references: () => Club.columns.id }),
    creatorId: column.text({ references: () => User.columns.id }),
  }
});

const Attendance = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    userId: column.text({ references: () => User.columns.id }),
    eventId: column.text({ references: () => Event.columns.id }),
    timestamp: column.date(),
  }
});


// https://astro.build/db/config
export default defineDb({
  tables: {
    User,
    Club,
    Drink,
    AlcoholicDrink,
    NonAlcoholicDrink,
    Fee,
    Payment,
    Expense,
    Income,
    Invoice,
    Event,
    Attendance,
  }
});
