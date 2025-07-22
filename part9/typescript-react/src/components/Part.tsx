import type { CoursePart } from "../types";

const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

const Part = ({ part }: { part: CoursePart }) => {
	switch (part.kind) {
		case "basic":
			return (
				<>
					<div>
						<span><strong>{part.name} {part.exerciseCount}</strong></span><br />
						<span>{part.description}</span>
					</div>
					<br />
				</>
			);
		case "group":
			return (
				<>
					<div>
						<span><strong>{part.name} {part.exerciseCount}</strong></span><br />
						<span>project exercises {part.groupProjectCount}</span>
					</div>
					<br />
				</>
			);
		case "background":
			return (
				<>
					<div>
						<span><strong>{part.name} {part.exerciseCount}</strong></span><br />
						<span>{part.description}</span><br />
						<span>submit to {part.backgroundMaterial}</span>
					</div>
					<br />
				</>
			);
		case "special":
			return (
				<>
					<div>
						<span><strong>{part.name} {part.exerciseCount}</strong></span><br />
						<span>{part.description}</span><br />
						<span>required skills: {part.requirements.join(', ')}</span>
					</div>
				</>
			);
		default:
			return assertNever(part);
	}
}


export default Part