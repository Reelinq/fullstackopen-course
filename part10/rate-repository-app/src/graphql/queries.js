import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $after: String, $first: Int) {
		repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, after: $after, first: $first) {
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
			pageInfo {
				endCursor
				startCursor
				hasNextPage
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

export const USER = gql`
	query getCurrentUser($includeReviews: Boolean = false) {
		me {
			id
			username
			reviews @include(if: $includeReviews) {
				edges {
					node {
						id
						rating
						repository {
							id
							fullName
						}
						text
						createdAt
					}
				}
			}
		}
}
`;

export const GET_REPO = gql`
	query Repository($repositoryId: ID!, $first: Int, $after: String) {
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
			reviews(first: $first, after: $after) {
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
				pageInfo {
					endCursor
					startCursor
					hasNextPage
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

export const DELETE_REVIEW = gql`
	mutation Mutation($deleteReviewId: ID!) {
		deleteReview(id: $deleteReviewId)
	}
`;