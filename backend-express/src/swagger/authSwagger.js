module.exports = (router) => {
    /**
     * @swagger
     * tags:
     *   name: Auth
     *   description: Authentication endpoints
     */

    /**
     * @swagger
     * /api/login:
     *   post:
     *     summary: Login user
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - email
     *               - password
     *             properties:
     *               email:
     *                 type: string
     *                 example: test@mile.app
     *               password:
     *                 type: string
     *                 example: password
     *     responses:
     *       200:
     *         description: Successfully logged in
     *       401:
     *         description: Invalid credentials
     */
};
