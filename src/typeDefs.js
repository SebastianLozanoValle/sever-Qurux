import { gql } from "apollo-server-express";

export const typeDefs = gql`
    # GraphQL typedefs
    type User {
        id: ID!
        username: String!
        password: String!
        avatar: String
        age: Int!
        gender: String!
        phone: String!
        email: String!
        city: String!
        street: String!
        role: Role!
        active: Boolean!
    }

    enum Role {
        admin
        specialist
        client
    }

    input UserInput {
        username: String!
        password: String!
        avatar: String
        age: Int!
        gender: String!
        phone: String!
        email: String!
        city: String!
        street: String!
        role: Role!
        active: Boolean
    }

    type Appointment {
        id: ID!
        date: String!
        startTime: String!
        estimatedEndTime: String!
        clientId: ID!
        specialistId: ID!
        subject: String!
        detail: String
        value: Float!
        status: Status!
    }

    enum Status {
        waiting
        scheduled
        pending
        completed
    }

    enum Specialty {
        Peluqueria
        Manicura
        Pedicura
    }

    enum World {
        Hombre
        Mujer
        Mascota
    }

    enum ServiceType {
        Domicilio
        Casa
        Mixto
    }

    enum PaymentOption {
        weekly
        biweekly
        monthly
    }

    input AppointmentInput {
        date: String!
        startTime: String!
        estimatedEndTime: String!
        clientId: ID!
        specialistId: ID!
        subject: String!
        detail: String
        value: Float!
        status: Status
    }

    type Review {
        id: ID!
        userId: ID!
        specialistId: ID!
        title: String!
        text: String!
        createdAt: String!
        rating: Float!
    }

    input ReviewInput {
        userId: ID!
        specialistId: ID!
        title: String!
        text: String!
        rating: Float!
    }

    type TimeSlot {
        start: String!
        end: String!
    }

    input TimeSlotInput {
        start: String!
        end: String!
    }

    type WeeklySchedule {
        Monday: [TimeSlot]
        Tuesday: [TimeSlot]
        Wednesday: [TimeSlot]
        Thursday: [TimeSlot]
        Friday: [TimeSlot]
        Saturday: [TimeSlot]
        Sunday: [TimeSlot]
    }

    input WeeklyScheduleInput {
        Monday: [TimeSlotInput]
        Tuesday: [TimeSlotInput]
        Wednesday: [TimeSlotInput]
        Thursday: [TimeSlotInput]
        Friday: [TimeSlotInput]
        Saturday: [TimeSlotInput]
        Sunday: [TimeSlotInput]

    }

    type Day {
        date: String!
        availableTimeSlots: [TimeSlot]!
        appointments: [Appointment]!
        weekday: String!
    }

    input DayInput {
        date: String!
        availableTimeSlots: [TimeSlotInput]!
        appointments: [AppointmentInput]!
    }

    type Specialist {
        id: ID!
        username: String!
        password: String!
        avatar: String
        age: Int!
        gender: String!
        phone: String!
        email: String!
        city: String!
        street: String!
        role: Role!
        active: Boolean!
        specialtys: [Specialty]
        world: World!
        weeklySchedule: WeeklySchedule!
        reviews: [Review]
        paymentOption: PaymentOption!
        appointments: [Appointment]
        highlighted: Boolean!
        serviceType: ServiceType!
    }

    input SpecialistInput {
        username: String!
        password: String!
        avatar: String
        age: Int!
        gender: String!
        phone: String!
        email: String!
        city: String!
        street: String!
        role: Role!
        active: Boolean
        specialtys: [Specialty]
        world: World!
        weeklySchedule: WeeklyScheduleInput!
        reviews: [ReviewInput]
        paymentOption: PaymentOption!
        appointments: [AppointmentInput]
        highlighted: Boolean
        serviceType: ServiceType!
    }

    input UpdateSpecialistInput {
        username: String
        avatar: String
        gender: String
        phone: String
        email: String
        city: String
        street: String
        role: Role
        active: Boolean
        specialtys: [Specialty]
        world: World
        weeklySchedule: WeeklyScheduleInput
        reviews: [ReviewInput]
        paymentOption: PaymentOption
        appointments: [AppointmentInput]
        highlighted: Boolean
        serviceType: ServiceType
    }

    type Client {
        id: ID!
        username: String!
        password: String!
        avatar: String
        age: Int!
        gender: String!
        phone: String!
        email: String!
        city: String!
        street: String!
        role: Role!
        active: Boolean!
        appointments: [Appointment]!
        favorites: [ID]!
        reviews: [Review]
    }

    input ClientInput {
        username: String!
        password: String!
        avatar: String
        age: Int!
        gender: String!
        phone: String!
        email: String!
        city: String!
        street: String!
        role: Role!
        active: Boolean
        appointments: [AppointmentInput]!
        favorites: [ID]!
        reviews: [ReviewInput]
    }

    input UpdateClientInput {
        username: String
        avatar: String
        gender: String
        phone: String
        email: String
        city: String
        street: String
        role: Role
        active: Boolean
        appointments: [AppointmentInput]
        favorites: [ID]
        reviews: [ReviewInput]
    }

    type AuthPayload {
        value: String
    }

    type Query {
        specialistCount: Int!
        findSpecialists(specialtys: [Specialty]): [Specialist]!
        findSpecialistByName(name: String!): Specialist
        getClient(id: ID!): Client
        getClients: [Client]
        me: User
    }


    type Mutation {
        login(username: String!, password: String!): AuthPayload
        createSpecialist(input: SpecialistInput!): Specialist
        createAppointment(input: AppointmentInput!): Appointment
        updateSpecialist(id: ID!, input: UpdateSpecialistInput!): Specialist
        updateClient(id: ID!, input: UpdateClientInput!): Client
        deleteSpecialist(id: ID!): Specialist
        changeSpecialtys(name: String!, specialtys: [Specialty]): Specialist
        scheduleAppointment(input: AppointmentInput!): Appointment
        createClient(input: ClientInput!): Client
        deleteClient(id: ID!): Client
        toggleSpecialistHighlight(id: ID!): Specialist
    }
`;