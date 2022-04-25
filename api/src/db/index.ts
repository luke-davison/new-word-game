import { Database } from "./Database";
import { FakeDatabaseConnection } from "./FakeDatabaseConnection";

export const db = new Database(new FakeDatabaseConnection())