const JoinUs = require("../Models/joinUsModel");

const postMember = async (req, res) => {
    try {
        const {
            country,
            city,
            experience,
            role,
            gender,
            resume } = req.body;
        const userId = req.params.id;
        const newMember = new JoinUs({
            user: userId,
            country,
            city,
            experience,
            role,
            gender,
            resume
        });

        await newMember.save();

        res
            .status(201)
            .json({
                message: "Member posted successfully",
                member: newMember,
            });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

const getMembers = async (req, res) => {
    try {
        const members = await JoinUs.find().populate('user', 'name email');

        const teamMembers = members?.map(member => ({
            name: member.user.name,
            email: member.user.email,
            member: member
        }));

        res.status(200).json({ teamMembers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const updateMemberStatus = async (req, res) => {
    try {
        const memberId = req.params.id;
        const { memberStatus } = req.body;

        const member = await JoinUs.findByIdAndUpdate(memberId, { memberStatus }, { new: true });

        if (!member) {
            return res.status(404).json({ error: "Member not found" });
        }

        res.status(200).json({ message: "Member status updated successfully", member });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const editJoinUsForm = async (req, res) => {
    try {
        const memberId = req.params.id;
        const {
            country,
            city,
            experience,
            role,
            gender,
            resume
        } = req.body;

        const updatedMember = await JoinUs.findByIdAndUpdate(memberId, {
            country,
            city,
            experience,
            role,
            gender,
            resume
        }, { new: true });

        if (!updatedMember) {
            return res.status(404).json({
                error: "Member not found"
            });
        }

        res.status(200).json({
            message: "Member information updated successfully",
            member: updatedMember
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

const withdrawMember = async (req, res) => {
    try {
        const memberId = req.params.id;

        const withdrawnMember = await JoinUs.findByIdAndDelete(memberId);

        if (!withdrawnMember) {
            return res.status(404).json({
                error: "Member not found"
            });
        }

        res.status(200).json({
            message: "Member withdrawn successfully",
            member: withdrawnMember
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};


module.exports = { postMember, getMembers, updateMemberStatus, editJoinUsForm, withdrawMember };
