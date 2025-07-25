import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
		repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
			edges {
				node {
					id
					fullName
					description
					language
					stargazersCount
					forksCount
					reviewCount
					ratingAverage
					ownerAvatarUrl
				}
			}
		}
	}
`;

export const LOGIN = gql`
  mutation Mutation($credentials: AuthenticateInput) {
		authenticate(credentials: $credentials) {
			user {
				username
			}
			accessToken
			expiresAt
		}
	}
`;

export const CHECK_USER = gql`
	query Me {
		me {
			id
			username
		}
	}
`;

export const GET_REPO = gql`
	query Repository($repositoryId: ID!) {
		repository(id: $repositoryId) {
			id
			fullName
			description
			language
			stargazersCount
			forksCount
			reviewCount
			ratingAverage
			ownerAvatarUrl
			url
			reviews {
				edges {
					node {
						id
						text
						rating
						createdAt
						user {
							id
							username
						}
					}
				}
			}
		}
	}
`;

export const ADD_REVIEW = gql`
	mutation Mutation($review: CreateReviewInput) {
		createReview(review: $review) {
			id
			rating
			repository {
				id
				fullName
			}
			text
			user {
				username
			}
		}
	}
`;

export const ADD_USER = gql`
	mutation Mutation($user: CreateUserInput) {
		createUser(user: $user) {
			username
			id
		}
	}
`;