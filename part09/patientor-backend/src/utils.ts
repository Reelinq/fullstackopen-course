import { z } from 'zod';
import { Gender, Entry, HealthCheckRating } from './types';

export const newEntrySchema = z.object({
	name: z.string(),
	dateOfBirth: z.string().date(),
	ssn: z.string().optional(),
	gender: z.nativeEnum(Gender),
	occupation: z.string(),
	entries: z.array(z.custom<Entry>()).default([])
});

export const baseEntrySchema = z.object({
	description: z.string(),
	date: z.string().date(),
	specialist: z.string(),
	diagnosisCodes: z.array(z.string()).optional()
});

export const healthCheckEntrySchema = baseEntrySchema.extend({
	type: z.literal("HealthCheck"),
	healthCheckRating: z.nativeEnum(HealthCheckRating)
});

export const hospitalEntrySchema = baseEntrySchema.extend({
	type: z.literal("Hospital"),
	discharge: z.object({
		date: z.string().date(),
		criteria: z.string()
	})
});

export const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
	type: z.literal("OccupationalHealthcare"),
	employerName: z.string(),
	sickLeave: z.object({
		startDate: z.string().date(),
		endDate: z.string().date()
	}).optional()
});

export const newEntryUnionSchema = z.discriminatedUnion("type", [
	healthCheckEntrySchema,
	hospitalEntrySchema,
	occupationalHealthcareEntrySchema
]);

export type NewEntry = z.infer<typeof newEntryUnionSchema>;