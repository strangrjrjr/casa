require "rails_helper"

describe "supervisors/new" do
  subject { render template: "supervisors/new" }

  before do
    assign :supervisor, Supervisor.new
  end

  context "while signed in as admin" do
    before do
      sign_in_as_admin
    end

    it { is_expected.to have_selector("a", text: "Return to Dashboard") }
  end
end
